import { memo } from 'react';
import { Outlet } from 'react-router';
import { MediaType, ModuleCompositionItemType } from '@services/modules/interfaces';

interface ModulesTypeRouteProps {
  contentType: MediaType | ModuleCompositionItemType.QUESTION;
}

function ModulesTypeRoute({ contentType }: ModulesTypeRouteProps) {
  return <Outlet context={{ contentType }} />;
}

export default memo(ModulesTypeRoute);
