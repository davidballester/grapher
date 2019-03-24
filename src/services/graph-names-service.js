export const GRAPHS_NAMES_STORAGE_KEY = 'grapher/services/graphs-service';

class GraphNamesService {
  getGraphNames() {
    const rawGraphNames = localStorage.getItem(GRAPHS_NAMES_STORAGE_KEY);
    return !!rawGraphNames ? JSON.parse(rawGraphNames) : [];
  }

  saveGraphName(graphName) {
    const graphNames = this.getGraphNames();
    const newGraphNames = [...graphNames, graphName];
    this.saveGraphNames(newGraphNames);
  }

  removeGraphName(graphName) {
    const graphNames = this.getGraphNames();
    const graphNameIndex = graphNames.findIndex((gn) => gn === graphName);
    if (graphNameIndex >= 0) {
      const newGraphNames = graphNames.filter((_, index) => index !== graphNameIndex);
      this.saveGraphNames(newGraphNames);
    }
  }

  saveGraphNames(graphNames) {
    localStorage.setItem(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify(graphNames));
  }
}

export default new GraphNamesService();
