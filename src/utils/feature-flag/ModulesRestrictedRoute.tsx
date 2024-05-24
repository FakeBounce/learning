import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { matchPath, useNavigate, useParams } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { getSingleModuleAction } from '@redux/actions/modulesActions';
import { PATH_MODULES, pathToQuestionTypeMap } from '@utils/navigation/paths';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import {
  MediaType,
  ModuleCompositionItemType,
  ModulesActions,
  QuestionType
} from '@services/modules/interfaces';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';
import { Outlet, useOutletContext } from 'react-router';
import { setContentForm } from '@redux/reducers/modulesReducer';

interface OutletContextType {
  contentType: MediaType | ModuleCompositionItemType.QUESTION;
}

function ModulesRestrictedRoute({ actionRequired }: { actionRequired: ModulesActions }) {
  const {
    modulesContentForm,
    modulesCurrent: { modulesCurrentData }
  } = useAppSelector((state) => state.modules);

  const { moduleId } = useParams();
  const { contentType }: OutletContextType = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (modulesCurrentData && !canDoModuleAction(modulesCurrentData, actionRequired)) {
      navigate(PATH_MODULES.root);
      enqueueSnackbar(t`Vous n'avez pas les droits sur ce module`, { variant: 'error' });
      return;
    }
    if (modulesContentForm.contentType === null) {
      /**
       * Match the current path with questions path to find the question type
       */
      if (contentType === ModuleCompositionItemType.QUESTION) {
        let questionType: QuestionType | undefined;
        for (const path in pathToQuestionTypeMap) {
          if (matchPath({ path: path, end: true }, location.pathname)) {
            questionType = pathToQuestionTypeMap[path];
            break;
          }
        }

        if (!questionType) {
          navigate(PATH_MODULES.root);
          enqueueSnackbar(t`Le type de question n'est pas défini`, { variant: 'error' });
          return;
        }
        dispatch(setContentForm({ contentType, questionType }));
      } else {
        dispatch(setContentForm({ contentType }));
      }
    }
    if (modulesCurrentData?.id !== Number(moduleId)) {
      try {
        const moduleIdToFetch = Number(moduleId);
        if (!isNaN(moduleIdToFetch)) {
          dispatch(getSingleModuleAction({ id: moduleIdToFetch }));
        } else {
          throw new Error();
        }
      } catch (_) {
        navigate(PATH_MODULES.root);
        enqueueSnackbar(t`Le module n'existe pas`, { variant: 'error' });
      }
    }
  }, [modulesCurrentData, modulesContentForm, moduleId]);

  return <Outlet />;
}

export default memo(ModulesRestrictedRoute);
