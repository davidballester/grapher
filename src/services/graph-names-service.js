export const GRAPHS_NAMES_STORAGE_KEY = 'grapher/services/graphs-service';

class GraphNamesService {
  getGraphNames() {
    const rawGraphNames = localStorage.getItem(GRAPHS_NAMES_STORAGE_KEY);
    return !!rawGraphNames ? JSON.parse(rawGraphNames) : [];
  }
}

export const graphNamesService = new GraphNamesService();
