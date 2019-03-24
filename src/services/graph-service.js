export const GRAPH_STORAGE_PREFIX = 'grapher/services/graphs/';

export class GraphService {
  saveGraph(graph) {
    const { name } = graph;
    const graphStorageKey = this.getGraphStorageKey(name);
    localStorage.setItem(graphStorageKey, JSON.stringify(graph));
  }

  readGraph(graphName) {
    const graphStorageKey = this.getGraphStorageKey(graphName);
    const graph = localStorage.getItem(graphStorageKey);
    return JSON.parse(graph);
  }

  removeGraph(graphName) {
    const graphStorageKey = this.getGraphStorageKey(graphName);
    localStorage.removeItem(graphStorageKey);
  }

  getGraphStorageKey(graphName) {
    return GRAPH_STORAGE_PREFIX + graphName;
  }
}

export default new GraphService();
