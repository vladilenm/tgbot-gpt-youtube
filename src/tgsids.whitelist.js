import config from 'config'

import tgIdsWhitelist from '../config/tgids.whitelist.json' assert {
  type: "json"
};

export function tgIdInWhiteList(tgId) {
    if (config.get('TGIDS_WHITELIST')) {
        return tgIdsWhitelist.includes(tgId);
    }
}
