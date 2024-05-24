import {
  Modules,
  ModulesCreate,
  ModulesProfile,
  ModulesVideoCreate,
  ModulesVideoDetail,
  ModulesImageCreate,
  ModulesImageDetail,
  ModulesDocumentCreate,
  ModulesDocumentDetail,
  ModulesAudioCreate,
  ModulesAudioDetail,
  ModulesQuestionTrueFalse,
  ModulesQuestionUnique
} from '@src/routes/elements';
import { PATH_MODULES, PATH_QUESTIONS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';
import ModulesRestrictedRoute from '@utils/feature-flag/ModulesRestrictedRoute';
import { MediaType, ModuleCompositionItemType, ModulesActions } from '@services/modules/interfaces';
import ModulesTypeRoute from '@utils/feature-flag/ModulesTypeRoute';

const ModulesRoutes = () => {
  return (
    <Route
      element={
        <FeatureFlagedRoute pageType={PermissionTypeEnum.MODULES} permissionsAuthorized={[]} />
      }
    >
      <Route path={PATH_MODULES.root} element={<Modules />} />
      <Route path={PATH_MODULES.profile} element={<ModulesProfile />} />
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_MODULES.add} element={<ModulesCreate />} />
      </Route>
      {ModulesVideoRoutes()}
      {ModulesImagesRoutes()}
      {ModulesDocumentRoutes()}
      {ModulesAudioRoutes()}
      {ModulesQuestionRoutes()}
    </Route>
  );
};

export default ModulesRoutes;

const ModulesVideoRoutes = () => {
  return (
    <Route element={<ModulesTypeRoute contentType={MediaType.VIDEO} />}>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.EDIT} />}>
        <Route path={PATH_MODULES.addVideo} element={<ModulesVideoCreate />} />
      </Route>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.SEE} />}>
        <Route path={PATH_MODULES.videoDetail} element={<ModulesVideoDetail />} />
      </Route>
    </Route>
  );
};

const ModulesImagesRoutes = () => {
  return (
    <Route element={<ModulesTypeRoute contentType={MediaType.IMAGE} />}>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.EDIT} />}>
        <Route path={PATH_MODULES.addImage} element={<ModulesImageCreate />} />
      </Route>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.SEE} />}>
        <Route path={PATH_MODULES.imageDetail} element={<ModulesImageDetail />} />
      </Route>
    </Route>
  );
};

const ModulesDocumentRoutes = () => {
  return (
    <Route element={<ModulesTypeRoute contentType={MediaType.DOCUMENT} />}>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.EDIT} />}>
        <Route path={PATH_MODULES.addDocument} element={<ModulesDocumentCreate />} />
      </Route>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.SEE} />}>
        <Route path={PATH_MODULES.documentDetail} element={<ModulesDocumentDetail />} />
      </Route>
    </Route>
  );
};

const ModulesAudioRoutes = () => {
  return (
    <Route element={<ModulesTypeRoute contentType={MediaType.AUDIO} />}>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.EDIT} />}>
        <Route path={PATH_MODULES.addAudio} element={<ModulesAudioCreate />} />
      </Route>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.SEE} />}>
        <Route path={PATH_MODULES.audioDetail} element={<ModulesAudioDetail />} />
      </Route>
    </Route>
  );
};

const ModulesQuestionRoutes = () => {
  return (
    <Route element={<ModulesTypeRoute contentType={ModuleCompositionItemType.QUESTION} />}>
      <Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.EDIT} />}>
        <Route path={PATH_QUESTIONS.trueFalse} element={<ModulesQuestionTrueFalse />} />
        <Route path={PATH_QUESTIONS.unique} element={<ModulesQuestionUnique />} />
      </Route>
      {/*<Route element={<ModulesRestrictedRoute actionRequired={ModulesActions.SEE} />}>*/}
      {/*  <Route path={PATH_MODULES.audioDetail} element={<ModulesAudioDetail />} />*/}
      {/*</Route>*/}
    </Route>
  );
};
