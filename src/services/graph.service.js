import { validate } from 'jsonschema';
import graphJsonSchema from './graph-schema';

export const GRAPH_STORAGE_PREFIX = 'grapher/services/graphs/';

export class GraphService {
  saveGraph(graph) {
    const { id } = graph;
    const graphStorageKey = this.getGraphStorageKey(id);
    localStorage.setItem(graphStorageKey, JSON.stringify(graph));
  }

  readGraph(id) {
    const graphStorageKey = this.getGraphStorageKey(id);
    const graph = localStorage.getItem(graphStorageKey);
    return JSON.parse(graph);
  }

  removeGraph(id) {
    const graphStorageKey = this.getGraphStorageKey(id);
    localStorage.removeItem(graphStorageKey);
  }

  getGraphStorageKey(id) {
    return GRAPH_STORAGE_PREFIX + id;
  }

  serializeGraph(graph) {
    return JSON.stringify(graph, null, 2);
  }

  deserializeGraph(serializedGraph) {
    let graph;
    try {
      graph = JSON.parse(serializedGraph);
    } catch (error) {
      return { errors: ['Invalid JSON'] };
    }
    const validationResult = validate(graph, graphJsonSchema);
    if (!validationResult.valid) {
      const errors = validationResult.errors.map((error) => error.stack).map((error) => error.replace('instance', 'Graph'));
      return { errors };
    }
    return { graph };
  }
}

export default new GraphService();
