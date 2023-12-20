import { winstonLogger } from '@huynguyen-hl/jobber-shared';
import { Logger } from 'winston';
import { config } from './config';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(config.ELASTIC_SEARCH_URL, 'gatewayServerElasticSearch', 'debug');

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: config.ELASTIC_SEARCH_URL
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while(!isConnected) {
      try {
        const health: ClusterHealthResponse = await this.elasticSearchClient.cluster.health({});
        log.info(`GatewayService Elasticsearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        log.error('Connect to ElasticSearch failed. Retrying....');
        log.log('error', 'GatewayService checkConnection() error method:', error);
      }
    }
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();