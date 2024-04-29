import { Module, ModuleDisplayAnswers } from '@services/modules/interfaces';

export const defaultModule: Module = {
  id: 1,
  title: 'Module 1',
  description: 'Description of module 1',
  media: 'https://via.placeholder.com/150',
  languageId: 1,
  tags: ['tag1', 'tag2'],
  timer: '00:00:00',
  isLocked: false,
  isPublic: false,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  successRate: 0,
  nbAttempts: 2,
  createdAt: '',
  updatedAt: '',
  organisationId: 1,
  createdBy: 1,
  organisation: {
    id: 1,
    name: 'Organisation 1',
    description: 'Description of organisation 1',
    organisation_id: 1,
    is_main: true,
    nb_users: 1
  }
};
