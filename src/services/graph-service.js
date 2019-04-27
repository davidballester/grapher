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
}

export default new GraphService();
