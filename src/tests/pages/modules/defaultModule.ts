import {
  Module,
  ModuleCompositionItem,
  ModuleCompositionItemType,
  ModuleDisplayAnswers,
  ModuleStatusEnum,
  ModuleSubject,
  ModuleUserRightEnum
} from '@services/modules/interfaces';

export const defaultModule: Module = {
  id: 2,
  language: 'french',
  title: 'Module title',
  parentId: null,
  description: 'Module description',
  timer: '00:00:00',
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  version: 1,
  status: ModuleStatusEnum.DRAFT,
  composition: '[]',
  tags: [],
  isLocked: false,
  isPublic: false,
  isLastPublishedOrArchivedVersion: false,
  isLastVersion: true,
  updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
  media: [],
  rights: {
    users: [
      {
        id: 1,
        login: 'Market',
        right: ModuleUserRightEnum.OWNER,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        pivot: {
          right: ModuleUserRightEnum.OWNER
        }
      }
    ],
    groups: []
  }
};

export const defaultModuleContributor: Module = {
  id: 2,
  language: 'french',
  title: 'Module title',
  parentId: null,
  description: 'Module description',
  timer: '00:00:00',
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  version: 1,
  status: ModuleStatusEnum.DRAFT,
  composition: '[]',
  tags: [],
  isLocked: false,
  isPublic: false,
  isLastPublishedOrArchivedVersion: false,
  isLastVersion: true,
  updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
  media: [],
  rights: {
    users: [
      {
        id: 1,
        login: 'Market',
        right: ModuleUserRightEnum.CONTRIBUTOR,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        pivot: {
          right: ModuleUserRightEnum.CONTRIBUTOR
        }
      }
    ],
    groups: []
  }
};

export const defaultModuleSupervisor: Module = {
  id: 2,
  language: 'french',
  title: 'Module title',
  parentId: null,
  description: 'Module description',
  timer: '00:00:00',
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  version: 1,
  status: ModuleStatusEnum.DRAFT,
  composition: '[]',
  tags: [],
  isLocked: false,
  isPublic: false,
  isLastPublishedOrArchivedVersion: false,
  isLastVersion: true,
  updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
  media: [],
  rights: {
    users: [
      {
        id: 1,
        login: 'Market',
        right: ModuleUserRightEnum.CONTRIBUTOR,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        pivot: {
          right: ModuleUserRightEnum.CONTRIBUTOR
        }
      }
    ],
    groups: []
  }
};

export const defaultModuleViewer: Module = {
  id: 2,
  language: 'french',
  title: 'Module title',
  parentId: null,
  description: 'Module description',
  timer: '00:00:00',
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  version: 1,
  status: ModuleStatusEnum.DRAFT,
  composition: '[]',
  tags: [],
  isLocked: false,
  isPublic: false,
  isLastPublishedOrArchivedVersion: false,
  isLastVersion: true,
  updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
  media: [],
  rights: {
    users: [
      {
        id: 1,
        login: 'Market',
        right: ModuleUserRightEnum.VIEWER,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        pivot: {
          right: ModuleUserRightEnum.VIEWER
        }
      }
    ],
    groups: []
  }
};

export const defaultModulesList: Module[] = [
  {
    id: 2,
    language: 'french',
    title: 'Module title 2',
    parentId: null,
    description: 'Module description',
    timer: '00:00:00',
    nbAttempts: 0,
    successRate: 0,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.DRAFT,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 20,
    language: 'french',
    title: 'Modules C',
    parentId: null,
    description: 'Modules A',
    timer: '01:00:00',
    nbAttempts: 0,
    successRate: 90,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.DRAFT,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:32:26.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 23,
    language: 'french',
    title: 'Module 23',
    parentId: null,
    description: 'Description 23',
    timer: '00:00:00',
    nbAttempts: 0,
    successRate: 0,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.PUBLISHED,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:43:33.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 24,
    language: 'french',
    title: 'Module 24',
    parentId: null,
    description: 'Description 24',
    timer: '00:00:00',
    nbAttempts: 0,
    successRate: 0,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.ARCHIVED,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:43:45.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 25,
    language: 'french',
    title: 'Module 25',
    parentId: null,
    description: 'Description 25',
    timer: '03:10:00',
    nbAttempts: 0,
    successRate: 0,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.DRAFT,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:43:59.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 26,
    language: 'french',
    title: 'Module 26',
    parentId: null,
    description: 'Description 26',
    timer: '03:10:00',
    nbAttempts: 99,
    successRate: 0,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.IN_CORRECTION,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:44:09.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 27,
    language: 'french',
    title: 'Module 27',
    parentId: null,
    description: 'Description 27',
    timer: '03:10:00',
    nbAttempts: 99,
    successRate: 1,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.DRAFT,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:44:15.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 28,
    language: 'english',
    title: 'Module 28',
    parentId: null,
    description: 'Description 28',
    timer: '03:10:00',
    nbAttempts: 99,
    successRate: 1,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.DRAFT,
    composition: '[]',
    tags: [],
    isLocked: false,
    isPublic: false,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:44:21.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  },
  {
    id: 29,
    language: 'english',
    title: 'Module 29',
    parentId: null,
    description: 'Description 29',
    timer: '03:10:00',
    nbAttempts: 99,
    successRate: 1,
    displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
    version: 1,
    status: ModuleStatusEnum.DRAFT,
    composition: '[]',
    tags: [],
    isLocked: true,
    isPublic: true,
    isLastPublishedOrArchivedVersion: false,
    isLastVersion: true,
    updatedAt: new Date('2024-05-02T06:44:28.000000Z'),
    media: [],
    rights: {
      users: [
        {
          id: 1,
          login: 'Market',
          right: ModuleUserRightEnum.OWNER
        }
      ],
      groups: []
    }
  }
];

export const defaultSubject: ModuleSubject = {
  id: 1,
  position: 0,
  questions: [],
  title: 'Subject title'
};

export const defaultCompositionItem: ModuleCompositionItem = {
  id: 1,
  name: 'Subject 1 title',
  type: ModuleCompositionItemType.SUBJECT,
  composition: []
};

export const defaultModuleComposition: ModuleCompositionItem[] = [
  {
    id: 1,
    name: 'Subject 1 title',
    type: ModuleCompositionItemType.SUBJECT,
    composition: []
  },
  {
    id: 2,
    name: 'New',
    type: ModuleCompositionItemType.SUBJECT,
    composition: []
  },
  {
    id: 3,
    name: 'Gato Saroto',
    type: ModuleCompositionItemType.SUBJECT,
    composition: []
  }
];

export const defaultModuleComposed: Module = {
  id: 1,
  language: 'french',
  title: 'Module title',
  parentId: null,
  description: 'Module description',
  timer: '00:00:00',
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  version: 1,
  status: ModuleStatusEnum.DRAFT,
  composition: JSON.stringify(defaultModuleComposition),
  tags: [],
  isLocked: false,
  isPublic: false,
  isLastPublishedOrArchivedVersion: false,
  isLastVersion: true,
  updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
  media: [],
  rights: {
    users: [
      {
        id: 1,
        login: 'Market',
        right: ModuleUserRightEnum.OWNER,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        pivot: {
          right: ModuleUserRightEnum.OWNER
        }
      }
    ],
    groups: []
  }
};

export const moduleComposedViewer: Module = {
  id: 1,
  language: 'french',
  title: 'Module title',
  parentId: null,
  description: 'Module description',
  timer: '00:00:00',
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: ModuleDisplayAnswers.AFTER_QUESTION,
  version: 1,
  status: ModuleStatusEnum.DRAFT,
  composition: JSON.stringify(defaultModuleComposition),
  tags: [],
  isLocked: false,
  isPublic: false,
  isLastPublishedOrArchivedVersion: false,
  isLastVersion: true,
  updatedAt: new Date('2024-04-24T14:47:10.000000Z'),
  media: [],
  rights: {
    users: [
      {
        id: 1,
        login: 'Market',
        right: ModuleUserRightEnum.VIEWER,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        pivot: {
          right: ModuleUserRightEnum.VIEWER
        }
      }
    ],
    groups: []
  }
};
