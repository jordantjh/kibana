/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { getIntegerRt } from '../runtime_types/integer_rt';
import { captureBodyRt } from '../runtime_types/capture_body_rt';
import { RawSettingDefinition } from './types';

/*
 * Settings added here will show up in the UI and will be validated on the client and server
 */
export const generalSettings: RawSettingDefinition[] = [
  // Active
  {
    key: 'active',
    type: 'boolean',
    defaultValue: 'true',
    label: i18n.translate('xpack.apm.agentConfig.active.label', {
      defaultMessage: 'Active'
    }),
    description: i18n.translate('xpack.apm.agentConfig.active.description', {
      defaultMessage:
        'A boolean specifying if the agent should be active or not.\nWhen active, the agent instruments incoming HTTP requests, tracks errors and collects and sends metrics.\nWhen inactive, the agent works as a noop, not collecting data and not communicating with the APM Server.\nAs this is a reversible switch, agent threads are not being killed when inactivated, but they will be \nmostly idle in this state, so the overhead should be negligible.\n\nYou can use this setting to dynamically disable Elastic APM at runtime.'
    }),
    excludeAgents: ['js-base', 'rum-js', 'python', 'dotnet']
  },

  // API Request Size
  {
    key: 'api_request_size',
    type: 'bytes',
    defaultValue: '768kb',
    label: i18n.translate('xpack.apm.agentConfig.apiRequestSize.label', {
      defaultMessage: 'API Request Size'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.apiRequestSize.description',
      {
        defaultMessage:
          'The maximum total compressed size of the request body which is sent to the APM server intake api via a chunked encoding (HTTP streaming).\nNote that a small overshoot is possible.\n\nAllowed byte units are `b`, `kb` and `mb`. `1kb` is equal to `1024b`.'
      }
    ),
    excludeAgents: ['js-base', 'rum-js', 'dotnet']
  },

  // API Request Time
  {
    key: 'api_request_time',
    type: 'duration',
    defaultValue: '10s',
    label: i18n.translate('xpack.apm.agentConfig.apiRequestTime.label', {
      defaultMessage: 'API Request Time'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.apiRequestTime.description',
      {
        defaultMessage:
          "Maximum time to keep an HTTP request to the APM Server open for.\n\nNOTE: This value has to be lower than the APM Server's `read_timeout` setting."
      }
    ),
    excludeAgents: ['js-base', 'rum-js', 'dotnet']
  },

  // Capture headers
  {
    key: 'capture_headers',
    type: 'boolean',
    defaultValue: 'true',
    label: i18n.translate('xpack.apm.agentConfig.captureHeaders.label', {
      defaultMessage: 'Capture Headers'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.captureHeaders.description',
      {
        defaultMessage:
          'If set to `true`, the agent will capture request and response headers, including cookies.\n\nNOTE: Setting this to `false` reduces network bandwidth, disk space and object allocations.'
      }
    ),
    excludeAgents: ['js-base', 'rum-js']
  },

  // Capture body
  {
    key: 'capture_body',
    validation: captureBodyRt,
    type: 'select',
    defaultValue: 'off',
    label: i18n.translate('xpack.apm.agentConfig.captureBody.label', {
      defaultMessage: 'Capture body'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.captureBody.description',
      {
        defaultMessage:
          'For transactions that are HTTP requests, the agent can optionally capture the request body (e.g. POST variables). Default is "off".'
      }
    ),
    options: [
      { text: 'off' },
      { text: 'errors' },
      { text: 'transactions' },
      { text: 'all' }
    ],
    excludeAgents: ['js-base', 'rum-js', 'dotnet']
  },

  // LOG_LEVEL
  {
    key: 'log_level',
    type: 'text',
    defaultValue: 'info',
    label: i18n.translate('xpack.apm.agentConfig.logLevel.label', {
      defaultMessage: 'Log level'
    }),
    description: i18n.translate('xpack.apm.agentConfig.logLevel.description', {
      defaultMessage: 'Sets the logging level for the agent'
    }),
    excludeAgents: ['js-base', 'rum-js', 'python']
  },

  // SERVER_TIMEOUT
  {
    key: 'server_timeout',
    type: 'duration',
    defaultValue: '5s',
    label: i18n.translate('xpack.apm.agentConfig.serverTimeout.label', {
      defaultMessage: 'Server Timeout'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.serverTimeout.description',
      {
        defaultMessage:
          'If a request to the APM server takes longer than the configured timeout,\nthe request is cancelled and the event (exception or transaction) is discarded.\nSet to 0 to disable timeouts.\n\nWARNING: If timeouts are disabled or set to a high value, your app could experience memory issues if the APM server times out.'
      }
    ),
    includeAgents: ['nodejs', 'java', 'go']
  },

  // SPAN_FRAMES_MIN_DURATION
  {
    key: 'span_frames_min_duration',
    type: 'duration',
    defaultValue: '5ms',
    label: i18n.translate('xpack.apm.agentConfig.spanFramesMinDuration.label', {
      defaultMessage: 'Span frames minimum duration'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.spanFramesMinDuration.description',
      {
        defaultMessage:
          'In its default settings, the APM agent will collect a stack trace with every recorded span.\nWhile this is very helpful to find the exact place in your code that causes the span, collecting this stack trace does have some overhead. \nWhen setting this option to a negative value, like `-1ms`, stack traces will be collected for all spans. Setting it to a positive value, e.g. `5ms`, will limit stack trace collection to spans with durations equal to or longer than the given value, e.g. 5 milliseconds.\n\nTo disable stack trace collection for spans completely, set the value to `0ms`.'
      }
    ),
    excludeAgents: ['js-base', 'rum-js', 'nodejs']
  },

  // STACK_TRACE_LIMIT
  {
    key: 'stack_trace_limit',
    type: 'integer',
    defaultValue: '50',
    label: i18n.translate('xpack.apm.agentConfig.stackTraceLimit.label', {
      defaultMessage: 'Stack trace limit'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.stackTraceLimit.description',
      {
        defaultMessage:
          'Setting it to 0 will disable stack trace collection. Any positive integer value will be used as the maximum number of frames to collect. Setting it -1 means that all frames will be collected.'
      }
    ),
    includeAgents: ['nodejs', 'java', 'dotnet', 'go']
  },

  // Transaction sample rate
  {
    key: 'transaction_sample_rate',
    type: 'float',
    defaultValue: '1.0',
    label: i18n.translate('xpack.apm.agentConfig.transactionSampleRate.label', {
      defaultMessage: 'Transaction sample rate'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.transactionSampleRate.description',
      {
        defaultMessage:
          'By default, the agent will sample every transaction (e.g. request to your service). To reduce overhead and storage requirements, you can set the sample rate to a value between 0.0 and 1.0. We still record overall time and the result for unsampled transactions, but no context information, labels, or spans.'
      }
    )
  },

  // Transaction max spans
  {
    key: 'transaction_max_spans',
    type: 'integer',
    validation: getIntegerRt({ min: 0, max: 32000 }),
    validationError: i18n.translate(
      'xpack.apm.agentConfig.transactionMaxSpans.errorText',
      { defaultMessage: 'Must be between 0 and 32000' }
    ),
    defaultValue: '500',
    label: i18n.translate('xpack.apm.agentConfig.transactionMaxSpans.label', {
      defaultMessage: 'Transaction max spans'
    }),
    description: i18n.translate(
      'xpack.apm.agentConfig.transactionMaxSpans.description',
      {
        defaultMessage:
          'Limits the amount of spans that are recorded per transaction. Default is 500.'
      }
    ),
    min: 0,
    max: 32000,
    excludeAgents: ['js-base', 'rum-js']
  }
];
