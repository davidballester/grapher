import { validate } from 'jsonschema';
import _pickBy from 'lodash/pickBy';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import firebase from 'firebase/app';
import 'firebase/database';

import graphJsonSchema from './graph-schema';

export const GRAPH_STORAGE_PREFIX = 'grapher/services/graphs/';

export class GraphService {
  saveGraph(userId, graph) {
    const { id: graphId } = graph;
    if (!userId) {
      const graphStorageKey = this.getGraphStorageKey(graphId);
      localStorage.setItem(graphStorageKey, JSON.stringify(graph));
    }
    if (!!userId) {
      const graphWithoutUndefines = this.removeNilProperties(graph);
      firebase
        .database()
        .ref(`users/${userId}/${graphId}`)
        .set(graphWithoutUndefines)
        .catch(console.error);
    }
  }

  readGraph(userId, graphId) {
    if (!userId) {
      const graphStorageKey = this.getGraphStorageKey(graphId);
      const graph = localStorage.getItem(graphStorageKey);
      return JSON.parse(graph);
    }
    return firebase
      .database()
      .ref(`users/${userId}/${graphId}`)
      .once('value')
      .then((snapshot) => snapshot.val())
      .catch(console.error);
  }

  removeGraph(userId, graphId) {
    if (!userId) {
      const graphStorageKey = this.getGraphStorageKey(graphId);
      localStorage.removeItem(graphStorageKey);
    }
    if (!!userId) {
      firebase
        .database()
        .ref(`users/${userId}/${graphId}`)
        .remove()
        .catch(console.error);
    }
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

  removeNilProperties(obj) {
    if (_isArray(obj)) {
      return obj.map((item) => this.removeNilProperties(item));
    }
    if (_isObject(obj)) {
      const cleanObj = _pickBy(obj, (x) => x !== undefined && x !== null);
      Object.keys(cleanObj).forEach((key) => {
        const value = cleanObj[key];
        const cleanValue = this.removeNilProperties(value);
        cleanObj[key] = cleanValue;
      });
      return cleanObj;
    }
    return obj;
  }
}

export default new GraphService();
