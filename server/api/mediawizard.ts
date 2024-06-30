import ExternalAPI from '@server/api/externalapi';
import cacheManager from '@server/lib/cache';
import { getSettings } from '@server/lib/settings';

interface MediaWizardRequest {
  request_type: string;
  tmdb_id: string;
  seasons: number[] | null;
}

class MediaWizard extends ExternalAPI {
  constructor() {
    const settingds = getSettings();
    super(
      settingds.mediawizard.host,
      {},
      {
        nodeCache: cacheManager.getCache('mediawizard').data,
      }
    );
  }

  public sendMediaRequest = async (params: MediaWizardRequest) => {
    await this.axios.post('/api/v1/media/request', params);
  };
}

export default MediaWizard;
