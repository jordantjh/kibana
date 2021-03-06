/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { validateUrls } from '../../../../common/validate_urls';
import { ReportingCore } from '../../../../server';
import { cryptoFactory } from '../../../../server/lib/crypto';
import {
  ConditionalHeaders,
  CreateJobFactory,
  ESQueueCreateJobFn,
  RequestFacade,
} from '../../../../types';
import { JobParamsPDF } from '../../types';

export const createJobFactory: CreateJobFactory<ESQueueCreateJobFn<
  JobParamsPDF
>> = async function createJobFactoryFn(reporting: ReportingCore) {
  const config = await reporting.getConfig();
  const crypto = cryptoFactory(config.get('encryptionKey'));

  return async function createJobFn(
    { title, relativeUrls, browserTimezone, layout, objectType }: JobParamsPDF,
    headers: ConditionalHeaders['headers'],
    request: RequestFacade
  ) {
    const serializedEncryptedHeaders = await crypto.encrypt(headers);

    validateUrls(relativeUrls);

    return {
      basePath: request.getBasePath(),
      browserTimezone,
      forceNow: new Date().toISOString(),
      headers: serializedEncryptedHeaders,
      layout,
      relativeUrls,
      title,
      objectType,
    };
  };
};
