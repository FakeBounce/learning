import { enqueueSnackbar } from 'notistack';
import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { t } from '@lingui/macro';
import * as ModulesActions from '../actions/modulesActions';
import {
  MediaType,
  Module,
  ModuleCompositionItemType,
  QuestionType
} from '@services/modules/interfaces';
import {
  addNestedItem,
  deleteMediaItem,
  deleteQuestionItem,
  updateMediaItem
} from '@utils/helpers/modulesFunctions';

export interface ModulesState {
  modulesList: {
    modulesListData: Module[];
    modulesListTotalCount: number;
  };
  modulesCurrent: {
    modulesCurrentData: Module | null;
    modulesCurrentIsEditing: boolean;
  };
  modulesLoading: boolean;
  modulesContentForm: {
    subjectId: number | null;
    contentType: MediaType | ModuleCompositionItemType.QUESTION | null;
    questionType: QuestionType | null;
  };
}
export const initialModulesState: ModulesState = {
  modulesList: {
    modulesListData: [],
    modulesListTotalCount: 0
  },
  modulesCurrent: {
    modulesCurrentData: null,
    modulesCurrentIsEditing: false
  },
  modulesLoading: false,
  modulesContentForm: {
    subjectId: null,
    contentType: null,
    questionType: null
  }
};

export const modulesSlice = createSlice({
  name: 'modules',
  initialState: initialModulesState,
  reducers: {
    resetModuleState: () => initialModulesState,
    startEditingModule: (state) => {
      state.modulesCurrent.modulesCurrentIsEditing = true;
    },
    cancelEditingModule: (state) => {
      state.modulesCurrent.modulesCurrentIsEditing = false;
    },
    resetModuleLoading: (state) => {
      state.modulesLoading = false;
    },
    setContentForm: (state, action) => {
      state.modulesContentForm = {
        ...state.modulesContentForm,
        ...action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ModulesActions.createModuleAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.createModuleAction.fulfilled, (state) => {
        state.modulesLoading = false;
        enqueueSnackbar(t`Le module à bien été créé`, {
          variant: 'success'
        });
      })
      .addCase(ModulesActions.createModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.getModulesAction.pending, (state) => {
        state.modulesLoading = true;
        state.modulesList.modulesListData = [];
      })
      .addCase(ModulesActions.getModulesAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesList.modulesListData = action.payload.data.rows;
        state.modulesList.modulesListTotalCount = action.payload.data.pagination.totalResults;
      })
      .addCase(ModulesActions.getModulesAction.rejected, (state, action: AnyAction) => {
        state.modulesLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(ModulesActions.getSingleModuleAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.getSingleModuleAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = action.payload.data;
      })
      .addCase(ModulesActions.getSingleModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.updateModuleAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.updateModuleAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = action.payload.data;
        enqueueSnackbar(t`Le module a bien été modifié`, { variant: 'success' });
      })
      .addCase(ModulesActions.updateModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.deleteModuleAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.deleteModuleAction.fulfilled, (state) => {
        state.modulesLoading = false;
        enqueueSnackbar(t`Le module a bien été supprimé`, { variant: 'success' });
      })
      .addCase(ModulesActions.deleteModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.createSubjectAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.createSubjectAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        const newComposition = state.modulesCurrent.modulesCurrentData?.composition || [];
        newComposition.push({
          name: action.payload.data.title,
          id: action.payload.data.id,
          type: ModuleCompositionItemType.SUBJECT,
          composition: []
        });
        state.modulesCurrent.modulesCurrentData = {
          ...(state.modulesCurrent.modulesCurrentData as Module),
          composition: newComposition
        };
        enqueueSnackbar(t`Le sujet a bien été créé`, { variant: 'success' });
      })
      .addCase(ModulesActions.createSubjectAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.deleteSubjectAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.deleteSubjectAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = action.payload.data;
        enqueueSnackbar(t`Le sujet a bien été supprimé`, { variant: 'success' });
      })
      .addCase(ModulesActions.deleteSubjectAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.moveSubjectAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.createMediaAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.createMediaAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = {
          ...(state.modulesCurrent.modulesCurrentData as Module),
          composition: addNestedItem(
            state.modulesCurrent.modulesCurrentData?.composition || [],
            state.modulesContentForm.subjectId,
            {
              name: action.payload.data.name,
              id: action.payload.data.id,
              type: ModuleCompositionItemType.MEDIA,
              path: action.payload.data.path
            }
          )
        };
        enqueueSnackbar(t`Le média a bien été ajouté`, { variant: 'success' });
      })
      .addCase(ModulesActions.createMediaAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.deleteMediaAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.deleteMediaAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = {
          ...(state.modulesCurrent.modulesCurrentData as Module),
          composition: deleteMediaItem(
            state.modulesCurrent.modulesCurrentData?.composition || [],
            action.payload.data.id
          )
        };
        enqueueSnackbar(t`Le média a bien été supprimé`, { variant: 'success' });
      })
      .addCase(ModulesActions.deleteMediaAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.updateMediaAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.updateMediaAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        const updatedData = updateMediaItem(
          state.modulesCurrent.modulesCurrentData?.composition || [],
          {
            name: action.payload.data.name,
            id: action.payload.data.id,
            type: ModuleCompositionItemType.MEDIA,
            path: action.payload.data.path
          }
        );
        state.modulesCurrent.modulesCurrentData = {
          ...(state.modulesCurrent.modulesCurrentData as Module),
          composition: updatedData
        };
        enqueueSnackbar(t`Le média a bien été modifié`, { variant: 'success' });
      })
      .addCase(ModulesActions.updateMediaAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.createQuestionAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.createQuestionAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = {
          ...(state.modulesCurrent.modulesCurrentData as Module),
          composition: addNestedItem(
            state.modulesCurrent.modulesCurrentData?.composition || [],
            state.modulesContentForm.subjectId,
            {
              name: action.payload.data.title,
              id: action.payload.data.id,
              type: ModuleCompositionItemType.QUESTION
            }
          )
        };
        enqueueSnackbar(t`La question a bien été ajoutée`, { variant: 'success' });
      })
      .addCase(ModulesActions.createQuestionAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.deleteQuestionAction.pending, (state) => {
        state.modulesLoading = true;
      })
      .addCase(ModulesActions.deleteQuestionAction.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modulesCurrent.modulesCurrentData = {
          ...(state.modulesCurrent.modulesCurrentData as Module),
          composition: deleteQuestionItem(
            state.modulesCurrent.modulesCurrentData?.composition || [],
            action.payload.data.id
          )
        };
        enqueueSnackbar(t`La question a bien été supprimé`, { variant: 'success' });
      })
      .addCase(ModulesActions.deleteQuestionAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const {
  resetModuleState,
  startEditingModule,
  cancelEditingModule,
  resetModuleLoading,
  setContentForm
} = modulesSlice.actions;
export default modulesSlice.reducer;
