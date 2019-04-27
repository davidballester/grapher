export const GRAPHS_NAMES_STORAGE_KEY = 'grapher/services/graphs-service';

class GraphNamesService {
  getGraphNames() {
    const rawGraphNames = localStorage.getItem(GRAPHS_NAMES_STORAGE_KEY);
    return !!rawGraphNames ? JSON.parse(rawGraphNames) : {};
  }

  saveGraphName(id, name) {
    const graphNames = this.getGraphNames();
    const newGraphNames = { ...graphNames, [id]: name };
    this.saveGraphNames(newGraphNames);
  }

  removeGraphName(id) {
    const graphNames = this.getGraphNames();
    delete graphNames[id];
    this.saveGraphNames(graphNames);
  }

  saveGraphNames(graphNames) {
    localStorage.setItem(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify(graphNames));
  }
}

export default new GraphNamesService();
