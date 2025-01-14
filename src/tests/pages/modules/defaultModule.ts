import {
  MediaType,
  Module,
  ModuleCompositionItem,
  ModuleCompositionItemType,
  ModuleDisplayAnswers,
  ModuleRights,
  ModuleStatusEnum,
  ModuleSubject,
  ModuleUserRightEnum,
  Tag
} from '@services/modules/interfaces';

interface ModuleFromAPI {
  composition: string;
  description: string;
  displayAnswers: ModuleDisplayAnswers;
  id: number;
  isLastPublishedOrArchivedVersion: boolean;
  isLastVersion: boolean;
  isLocked: boolean;
  isPublic: boolean;
  language: string;
  media: string[];
  nbAttempts: number;
  parentId: number | null;
  rights: ModuleRights;
  successRate: number;
  status: ModuleStatusEnum;
  tags: Tag[];
  timer: string;
  title: string;
  updatedAt: Date;
  version: number;
}

export const defaultModule: ModuleFromAPI = {
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

export const defaultModuleContributor: ModuleFromAPI = {
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

export const defaultModuleSupervisor: ModuleFromAPI = {
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

export const defaultModuleViewer: ModuleFromAPI = {
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

export const defaultModulesList: ModuleFromAPI[] = [
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
  composition: defaultModuleComposition,
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
  composition: defaultModuleComposition,
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

export const defaultMediaImage = {
  name: 'Some media image',
  id: 1,
  type: ModuleCompositionItemType.MEDIA,
  path: 'somepath image',
  mediaType: MediaType.IMAGE
};

export const defaultMediaVideo = {
  name: 'Some media video',
  id: 2,
  type: ModuleCompositionItemType.MEDIA,
  path: 'http://somepath.com',
  mediaType: MediaType.VIDEO
};

export const defaultMediaDocument = {
  name: 'Some media document',
  id: 3,
  type: ModuleCompositionItemType.MEDIA,
  path: 'somepath document',
  mediaType: MediaType.DOCUMENT
};

export const defaultMediaAudio = {
  name: 'Some media audio',
  id: 4,
  type: ModuleCompositionItemType.MEDIA,
  path: 'http://somepath.com',
  mediaType: MediaType.AUDIO
};

export const defaultMediaGif = {
  name: 'Some media gif',
  id: 5,
  type: ModuleCompositionItemType.MEDIA,
  path: 'somepath gif',
  mediaType: MediaType.GIF
};

export const defaultModuleForMedias: Module = {
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
  composition: [
    defaultMediaImage,
    defaultMediaVideo,
    defaultMediaDocument,
    defaultMediaAudio,
    defaultMediaGif
  ],
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
