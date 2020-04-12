import firebase from 'firebase/app';
import 'firebase/database';

export const GRAPHS_NAMES_STORAGE_KEY = 'grapher/services/graphs-service';

class GraphNamesService {
  getGraphNames(userId) {
    if (!userId) {
      const rawGraphNames = localStorage.getItem(GRAPHS_NAMES_STORAGE_KEY);
      return !!rawGraphNames ? JSON.parse(rawGraphNames) : {};
    }
    return firebase
      .database()
      .ref(`users/${userId}`)
      .once('value')
      .then((snapshot) => snapshot.val() || {})
      .then((allGraphs) => {
        const names = {};
        Object.keys(allGraphs).forEach((graphId) => {
          const graph = allGraphs[graphId];
          const graphName = graph.name;
          names[graphId] = graphName;
        });
        return names;
      })
      .catch(console.error);
  }

  saveGraphName(userId, graphId, name) {
    if (!userId) {
      const graphNames = this.getGraphNames();
      const newGraphNames = { ...graphNames, [graphId]: name };
      this.saveGraphNames(newGraphNames);
    }
  }

  removeGraphName(userId, graphId) {
    if (!userId) {
      const graphNames = this.getGraphNames();
      delete graphNames[graphId];
      this.saveGraphNames(graphNames);
    }
  }

  saveGraphNames(graphNames) {
    localStorage.setItem(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify(graphNames));
  }
}

export default new GraphNamesService();
