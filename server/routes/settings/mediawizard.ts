import { getSettings, type MediaWizardSettings } from '@server/lib/settings';
import logger from '@server/logger';
import { Router } from 'express';

const mediawizardRoutes = Router();

mediawizardRoutes.get('/', (_req, res) => {
  const settings = getSettings();

  res.status(200).json(settings.mediawizard);
});

mediawizardRoutes.put('/', (req, res) => {
  const settings = getSettings();

  const newMediaWizard = req.body as MediaWizardSettings;
  newMediaWizard.id = 1;
  settings.mediawizard = newMediaWizard;
  settings.save();

  logger.debug('MediaWizard settings updated');

  return res.status(200).json(newMediaWizard);
});

export default mediawizardRoutes;
