(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    298: function(e) {
      e.exports = {
        definitions: {},
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'http://example.com/root.json',
        type: 'object',
        title: 'The Root Schema',
        required: ['name', 'nodes', 'links'],
        properties: {
          name: { $id: '#/properties/name', type: 'string', title: 'The Name Schema', default: '', examples: ['Mario world!'], pattern: '^(.+)$' },
          nodes: {
            $id: '#/properties/nodes',
            type: 'object',
            title: 'The Nodes Schema',
            patternProperties: {
              '.+': {
                type: 'object',
                title: 'The Mario Schema',
                required: ['id'],
                properties: {
                  color: {
                    $id: '#/properties/nodes/properties/mario/properties/color',
                    type: 'string',
                    title: 'The Color Schema',
                    default: '',
                    examples: ['#448aff'],
                    pattern: '^#([0-9a-fA-F]{6})$',
                  },
                  id: {
                    $id: '#/properties/nodes/properties/mario/properties/id',
                    type: 'string',
                    title: 'The Id Schema',
                    default: '',
                    examples: ['mario'],
                    pattern: '^(.+)$',
                  },
                },
              },
            },
          },
          links: {
            $id: '#/properties/links',
            type: 'object',
            title: 'The Links Schema',
            patternProperties: {
              '.+': {
                $id: '#/properties/links/properties/mario-luigi',
                type: 'object',
                title: 'The Mario-luigi Schema',
                required: ['id', 'label', 'source', 'target'],
                properties: {
                  id: {
                    $id: '#/properties/links/properties/mario-luigi/properties/id',
                    type: 'string',
                    title: 'The Id Schema',
                    default: '',
                    examples: ['mario-luigi'],
                    pattern: '^(.+)$',
                  },
                  label: {
                    $id: '#/properties/links/properties/mario-luigi/properties/label',
                    type: 'string',
                    title: 'The Label Schema',
                    default: '',
                    examples: ['brothers'],
                    pattern: '^(.+)$',
                  },
                  source: {
                    $id: '#/properties/links/properties/mario-luigi/properties/source',
                    type: 'string',
                    title: 'The Source Schema',
                    default: '',
                    examples: ['mario'],
                    pattern: '^(.+)$',
                  },
                  target: {
                    $id: '#/properties/links/properties/mario-luigi/properties/target',
                    type: 'string',
                    title: 'The Target Schema',
                    default: '',
                    examples: ['luigi'],
                    pattern: '^(.+)$',
                  },
                },
              },
            },
          },
        },
      };
    },
    331: function(e, t, n) {
      e.exports = n.p + 'static/media/onboarding-introduction.63f30b76.png';
    },
    332: function(e, t, n) {
      e.exports = n.p + 'static/media/onboarding-add-nodes-and-links.914f6f6c.png';
    },
    333: function(e, t, n) {
      e.exports = n.p + 'static/media/onboarding-groups.68c8615e.png';
    },
    334: function(e, t, n) {
      e.exports = n.p + 'static/media/onboarding-text-editor.0e6bebf0.png';
    },
    366: function(e, t, n) {
      e.exports = n(670);
    },
    583: function(e, t, n) {},
    668: function(e, t, n) {},
    669: function(e, t, n) {},
    670: function(e, t, n) {
      'use strict';
      n.r(t);
      var a = n(0),
        r = n.n(a),
        c = n(14),
        o = n(18),
        i = n.n(o),
        l = n(751),
        u = n(753),
        s = n(35),
        p = n(347),
        d = n(27),
        m = n(7),
        f = n(29),
        g = n(296),
        h = n.n(g),
        b = n(76),
        E = n(77),
        v = new ((function() {
          function e() {
            Object(b.a)(this, e);
          }
          return (
            Object(E.a)(e, [
              {
                key: 'getGraphNames',
                value: function() {
                  var e = localStorage.getItem('grapher/services/graphs-service');
                  return e ? JSON.parse(e) : {};
                },
              },
              {
                key: 'saveGraphName',
                value: function(e, t) {
                  var n = this.getGraphNames(),
                    a = Object(m.a)({}, n, Object(d.a)({}, e, t));
                  this.saveGraphNames(a);
                },
              },
              {
                key: 'removeGraphName',
                value: function(e) {
                  var t = this.getGraphNames();
                  delete t[e], this.saveGraphNames(t);
                },
              },
              {
                key: 'saveGraphNames',
                value: function(e) {
                  localStorage.setItem('grapher/services/graphs-service', JSON.stringify(e));
                },
              },
            ]),
            e
          );
        })())(),
        O = n(37),
        j = n(60),
        k = n.n(j),
        y = 'grapher/Graph/SET_NAME',
        N = 'grapher/Graph/CREATE',
        w = 'grapher/Graph/LOAD',
        x = 'grapher/Graph/LOAD_SUCCESS',
        C = 'grapher/Graph/CREATE_NODE',
        S = 'grapher/Graph/CREATE_LINK',
        G = 'grapher/Graph/DELETE_NODE',
        I = 'grapher/Graph/DELETE_LINK',
        L = 'grapher/Graph/EDIT_NODE',
        D = 'grapher/Graph/DELETE',
        _ = 'grapher/Graph/EDIT_LINK',
        T = 'grapher/Graph/IMPORT_SUBGRAPH',
        R = 'grapher/Graph/ADD',
        P = 'grapher/Graph/REMOVE',
        A = 'grapher/Graph/UPDATE';
      function F(e) {
        return { type: N, payload: Object(m.a)({}, e, { id: k()() }) };
      }
      function M(e) {
        return { type: w, payload: e };
      }
      function H(e) {
        return { type: x, payload: e };
      }
      function W(e) {
        return { type: S, payload: e };
      }
      function B() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        return { type: T, payload: { nodes: e, links: t, groups: n } };
      }
      function z(e) {
        return { type: R, payload: Object(m.a)({ id: k()() }, e) };
      }
      function K(e) {
        return { type: P, payload: e };
      }
      function q(e) {
        return { type: A, payload: e };
      }
      var V = {
        id: '',
        name: '',
        nodes: {
          kingarthur: { id: 'kingarthur' },
          sirgalahad: { id: 'sirgalahad' },
          sirlancelot: { id: 'sirlancelot' },
          sirlamorak: { id: 'sirlamorak' },
          sirbors: { id: 'sirbors' },
          ladyguinevere: { id: 'ladyguinevere' },
          merlin: { id: 'merlin' },
          sirmordred: { id: 'sirmordred' },
        },
        links: {
          'kingarthur-sirmordred': { id: 'kingarthur-sirmordred', label: 'fathers', source: 'kingarthur', target: 'sirmordred' },
          'kingarthur-ladyguinevere': { id: 'kingarthur-ladyguinevere', label: 'married to', source: 'kingarthur', target: 'ladyguinevere' },
          'kingarthur-merlin': { id: 'kingarthur-merlin', label: 'mentored by', source: 'kingarthur', target: 'merlin' },
          'sirlancelot-kingarthur': { id: 'sirlancelot-kingarthur', label: 'serves', source: 'sirlancelot', target: 'kingarthur' },
          'sirlancelot-sirgalahad': { id: 'sirlancelot-sirgalahad', label: 'fathers', source: 'sirlancelot', target: 'sirgalahad' },
          'sirlancelot-ladyguinevere': {
            id: 'sirlancelot-ladyguinevere',
            label: 'in a relationship with',
            source: 'sirlancelot',
            target: 'ladyguinevere',
          },
          'sirlancelot-sirbors': { id: 'sirlancelot-sirbors', label: 'cousin of', source: 'sirlancelot', target: 'sirbors' },
          'sirgalahad-sirlamorak': { id: 'sirgalahad-sirlamorak', label: 'friend of', source: 'sirgalahad', target: 'sirlamorak' },
        },
        groups: {},
      };
      var $ = n(297),
        U = n(298),
        J = new ((function() {
          function e() {
            Object(b.a)(this, e);
          }
          return (
            Object(E.a)(e, [
              {
                key: 'saveGraph',
                value: function(e) {
                  var t = e.id,
                    n = this.getGraphStorageKey(t);
                  localStorage.setItem(n, JSON.stringify(e));
                },
              },
              {
                key: 'readGraph',
                value: function(e) {
                  var t = this.getGraphStorageKey(e),
                    n = localStorage.getItem(t);
                  return JSON.parse(n);
                },
              },
              {
                key: 'removeGraph',
                value: function(e) {
                  var t = this.getGraphStorageKey(e);
                  localStorage.removeItem(t);
                },
              },
              {
                key: 'getGraphStorageKey',
                value: function(e) {
                  return 'grapher/services/graphs/' + e;
                },
              },
              {
                key: 'serializeGraph',
                value: function(e) {
                  return JSON.stringify(e, null, 2);
                },
              },
              {
                key: 'deserializeGraph',
                value: function(e) {
                  var t;
                  try {
                    t = JSON.parse(e);
                  } catch (a) {
                    return { errors: ['Invalid JSON'] };
                  }
                  var n = Object($.validate)(t, U);
                  return n.valid
                    ? { graph: t }
                    : {
                        errors: n.errors
                          .map(function(e) {
                            return e.stack;
                          })
                          .map(function(e) {
                            return e.replace('instance', 'Graph');
                          }),
                      };
                },
              },
            ]),
            e
          );
        })())();
      function X(e) {
        return e.graph;
      }
      function Y(e) {
        return X(e).id;
      }
      function Z(e) {
        return X(e).name;
      }
      function Q(e) {
        return X(e).nodes;
      }
      function ee(e) {
        return X(e).links;
      }
      var te = Object(f.a)(Q, function(e) {
          return Object.values(e);
        }),
        ne = Object(f.a)(ee, function(e) {
          return Object.values(e);
        }),
        ae = Object(f.a)(Q, function(e) {
          return Object.keys(e);
        }),
        re = Object(f.a)(ne, function(e) {
          return e.filter(function(t) {
            return !!(function(e, t) {
              var n = t.source,
                a = t.target;
              return e.find(function(e) {
                var t = e.source,
                  r = e.target;
                return t === a && r === n;
              });
            })(e, t);
          });
        }),
        ce = Object(f.a)(re, function(e) {
          return e.map(function(e) {
            return e.id;
          });
        }),
        oe = Object(f.a)(X, function(e) {
          return J.serializeGraph(e);
        }),
        ie = Object(f.a)(X, function(e) {
          return e.groups;
        }),
        le = Object(f.a)(ie, function(e) {
          return Object.keys(e).map(function(t) {
            return e[t];
          });
        });
      var ue = n(13),
        se = n.n(ue),
        pe = n(15),
        de = se.a.mark(Ee),
        me = se.a.mark(ve),
        fe = se.a.mark(Oe),
        ge = se.a.mark(je),
        he = se.a.mark(ke),
        be = se.a.mark(ye);
      function Ee() {
        var e;
        return se.a.wrap(function(t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (t.next = 2), Object(pe.d)(X);
              case 2:
                return (e = t.sent), (t.next = 5), Object(pe.a)([J, 'saveGraph'], e);
              case 5:
                return (t.next = 7), Object(pe.a)([v, 'saveGraphName'], e.id, e.name);
              case 7:
              case 'end':
                return t.stop();
            }
        }, de);
      }
      function ve() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([N, y, C, S, G, I, L, _, R, P, A, T], Ee);
              case 2:
              case 'end':
                return e.stop();
            }
        }, me);
      }
      function Oe(e) {
        var t, n;
        return se.a.wrap(function(a) {
          for (;;)
            switch ((a.prev = a.next)) {
              case 0:
                return (t = e.payload), (a.next = 3), Object(pe.a)([J, 'readGraph'], t);
              case 3:
                return (n = a.sent), (a.next = 6), Object(pe.c)(H(n));
              case 6:
              case 'end':
                return a.stop();
            }
        }, fe);
      }
      function je() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([w], Oe);
              case 2:
              case 'end':
                return e.stop();
            }
        }, ge);
      }
      function ke(e) {
        var t;
        return se.a.wrap(function(n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (t = e.payload), (n.next = 3), Object(pe.a)([J, 'removeGraph'], t);
              case 3:
                return (n.next = 5), Object(pe.a)([v, 'removeGraphName'], t);
              case 5:
              case 'end':
                return n.stop();
            }
        }, he);
      }
      function ye() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([D], ke);
              case 2:
              case 'end':
                return e.stop();
            }
        }, be);
      }
      var Ne = v.getGraphNames();
      var we = Object(f.a)(
          function(e) {
            return e.graphList;
          },
          function(e) {
            return h()(e);
          }
        ),
        xe = n(21),
        Ce = 2,
        Se = { BASE: '/', GRAPHS: '/graphs', NEW_GRAPH: '/new', GRAPH: '/graphs/:graphId', IMPORT_GRAPH: '/import' },
        Ge = 'grapher/NodeSelection/SELECT',
        Ie = 'grapher/NodeSelection/DESELECT',
        Le = { selectedNodes: [] };
      function De(e) {
        return { type: Ge, payload: e };
      }
      function _e(e) {
        return { type: Ie, payload: e };
      }
      function Te(e) {
        return (function(e) {
          return e.nodeSelection;
        })(e).selectedNodes;
      }
      var Re = Object(f.a)(Te, ne, function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          if (2 === e.length) {
            var n = e.map(function(e) {
                return e.id;
              }),
              a = Object(xe.a)(n, 2),
              r = a[0],
              c = a[1];
            if (
              !t.find(function(e) {
                var t = e.source,
                  n = e.target;
                return (t === r || t === c) && (n === c || n === r);
              })
            )
              return { source: r, target: c };
          }
        }),
        Pe = 'grapher/LinkSelection/SELECT',
        Ae = 'grapher/LinkSelection/DESELECT',
        Fe = { selectedLink: void 0 };
      function Me(e) {
        return { type: Pe, payload: e };
      }
      function He() {
        return { type: Ae };
      }
      function We(e) {
        return (function(e) {
          return e.linkSelection;
        })(e).selectedLink;
      }
      var Be = n(73),
        ze = Object(Be.a)(),
        Ke = se.a.mark(et),
        qe = se.a.mark(tt),
        Ve = 'grapher/GraphImport/IMPORT',
        $e = 'grapher/GraphImport/IMPORT_SUCCESS',
        Ue = 'grapher/GraphImport/IMPORT_FAILURE',
        Je = { errors: [] };
      function Xe(e) {
        return { type: Ve, payload: e };
      }
      function Ye(e) {
        return { type: $e, payload: e };
      }
      function Ze(e) {
        return { type: Ue, payload: e };
      }
      var Qe = Object(f.a)(
        function(e) {
          return e.graphImport;
        },
        function(e) {
          return e.errors;
        }
      );
      function et(e) {
        var t, n, a, r;
        return se.a.wrap(function(c) {
          for (;;)
            switch ((c.prev = c.next)) {
              case 0:
                return (t = e.payload), (c.next = 3), Object(pe.a)([J, 'deserializeGraph'], t);
              case 3:
                if (((n = c.sent), (a = n.errors), (r = n.graph), !a)) {
                  c.next = 11;
                  break;
                }
                return (c.next = 9), Object(pe.c)(Ze(a));
              case 9:
                c.next = 15;
                break;
              case 11:
                return (c.next = 13), Object(pe.c)(Ye(r));
              case 13:
                return (c.next = 15), Object(pe.c)(F(r));
              case 15:
              case 'end':
                return c.stop();
            }
        }, Ke);
      }
      function tt() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([Ve], et);
              case 2:
              case 'end':
                return e.stop();
            }
        }, qe);
      }
      var nt = se.a.mark(dt),
        at = se.a.mark(mt),
        rt = 'grapher/Navigation/GRAPH_IMPORT_OPEN',
        ct = 'grapher/Navigation/NEW_GRAPH_OPEN',
        ot = 'grapher/Navigation/GRAPH_OPEN',
        it = 'grapher/Navigation/GRAPH_LIST_OPEN';
      function lt() {
        return { type: rt };
      }
      function ut() {
        return { type: ct };
      }
      function st(e) {
        return { type: ot, payload: e };
      }
      function pt() {
        return { type: it };
      }
      function dt(e) {
        var t, n;
        return se.a.wrap(function(a) {
          for (;;)
            switch ((a.prev = a.next)) {
              case 0:
                (t = e.type),
                  (n = e.payload),
                  (a.t0 = t),
                  (a.next =
                    a.t0 === ct
                      ? 4
                      : a.t0 === it
                      ? 7
                      : a.t0 === D
                      ? 7
                      : a.t0 === ot
                      ? 10
                      : a.t0 === N
                      ? 13
                      : a.t0 === rt
                      ? 16
                      : a.t0 === $e
                      ? 19
                      : 22);
                break;
              case 4:
                return (a.next = 6), Object(pe.a)([ze, 'push'], Se.NEW_GRAPH);
              case 6:
                return a.abrupt('break', 23);
              case 7:
                return (a.next = 9), Object(pe.a)([ze, 'push'], Se.BASE);
              case 9:
                return a.abrupt('break', 23);
              case 10:
                return (a.next = 12), Object(pe.a)([ze, 'push'], ''.concat(Se.GRAPHS, '/').concat(n));
              case 12:
                return a.abrupt('break', 23);
              case 13:
                return (a.next = 15), Object(pe.a)([ze, 'push'], ''.concat(Se.GRAPHS, '/').concat(n.id));
              case 15:
                return a.abrupt('break', 23);
              case 16:
                return (a.next = 18), Object(pe.a)([ze, 'push'], Se.IMPORT_GRAPH);
              case 18:
                return a.abrupt('break', 23);
              case 19:
                return (a.next = 21), Object(pe.a)([ze, 'push'], ''.concat(Se.GRAPHS, '/').concat(n.id));
              case 21:
              case 22:
                return a.abrupt('break', 23);
              case 23:
              case 'end':
                return a.stop();
            }
        }, nt);
      }
      function mt() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([ct, it, ot, N, D, rt, $e], dt);
              case 2:
              case 'end':
                return e.stop();
            }
        }, at);
      }
      var ft = {
          EDIT_GRAPH: 'editgraph',
          EDIT_LINK: 'editlink',
          EDIT_NODE: 'editnode',
          NEW_NODE: 'newnode',
          NEW_LINK: 'newlink',
          CONFIRM_DELETE_GRAPH: 'confirmdeletegraph',
          CONFIRM_DELETE_LINK: 'confirmdeletelink',
          CONFIRM_DELETE_NODE: 'confirmdeletenode',
          EXPORT_GRAPH: 'exportgraph',
        },
        gt = 'grapher/EditGraph/OPEN',
        ht = 'grapher/EditGraph/CLOSE',
        bt = {};
      function Et(e, t) {
        return { type: gt, payload: { dialogId: e, metadata: t } };
      }
      function vt(e) {
        return { type: ht, payload: e };
      }
      function Ot(e, t) {
        return (function(e) {
          return e.dialog;
        })(e)[t];
      }
      function jt(e, t) {
        var n = Ot(e, t);
        return !!n && n.isOpen;
      }
      function kt(e, t) {
        var n = Ot(e, t);
        return n ? n.metadata : void 0;
      }
      var yt = se.a.mark(It),
        Nt = se.a.mark(Lt),
        wt = 'grapher/Canvas/REGISTER_CANVAS_COMPONENT',
        xt = 'grapher/Canvas/REFRESH',
        Ct = { canvasComponent: void 0 };
      function St(e) {
        return { type: wt, payload: e };
      }
      var Gt = Object(f.a)(
        function(e) {
          return e.canvas;
        },
        function(e) {
          return e.canvasComponent;
        }
      );
      function It() {
        var e;
        return se.a.wrap(function(t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (t.next = 2), Object(pe.d)(Gt);
              case 2:
                return (e = t.sent), (t.next = 5), Object(pe.a)([e, 'refresh']);
              case 5:
              case 'end':
                return t.stop();
            }
        }, yt);
      }
      function Lt() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([xt], It);
              case 2:
              case 'end':
                return e.stop();
            }
        }, Nt);
      }
      var Dt = n(299),
        _t = n(127),
        Tt = n(132),
        Rt = n.n(Tt),
        Pt = n(173),
        At = n.n(Pt),
        Ft = n(174),
        Mt = n.n(Ft),
        Ht = function(e) {
          return { id: k()(), name: e.name };
        },
        Wt = function(e) {
          return At()({ id: e.id, groups: e.groups ? e.groups.map(Ht) : void 0 }, Mt.a);
        },
        Bt = new ((function() {
          function e() {
            Object(b.a)(this, e);
          }
          return (
            Object(E.a)(e, [
              {
                key: 'initialize',
                value: (function() {
                  var e = Object(Dt.a)(
                    se.a.mark(function e() {
                      return se.a.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                (this.grammar = _t.grammar(
                                  '\nGrapher {\n\n  path\n      = partialPath+ node --partials\n      | node+ --nodes\n\n  partialPath = node link\n\n  node\n      = "(" identifier ")" --nodeNoGroups\n      | "(" identifier groups ")" --nodeGroups\n\n  link\n      = "-[" identifier "]->" --forwardWithLabel\n      | "<-[" identifier "]-" --backwardWithLabel\n      | "-[" identifier? groups "]->" --forwardGroups\n      | "<-[" identifier? groups "]-" --backwardGroups\n      | "->" --forward\n      | "<-" --backward\n\n  groups\n      = groups+ --multipleGroups\n      | ":" identifier --singleGroup\n\n  identifier\n      = identifier space identifier  --withBlanks\n      | alnum+ --string\n\n}\n'
                                )),
                                  (this.semantics = this.grammar.createSemantics().addOperation('eval', {
                                    path_partials: function(e, t) {
                                      var n = Rt()([].concat(Object(O.a)(e.eval()), [t.eval()])),
                                        a = n.filter(function(e) {
                                          return 'group' === e.type;
                                        }),
                                        r = n.filter(function(e) {
                                          return 'group' !== e.type;
                                        });
                                      return {
                                        nodes: r
                                          .filter(function(e) {
                                            return 'node' === e.type;
                                          })
                                          .map(Wt),
                                        links: r
                                          .map(function(e, t) {
                                            return [e, t];
                                          })
                                          .filter(function(e) {
                                            return 'link' === Object(xe.a)(e, 1)[0].type;
                                          })
                                          .map(function(e) {
                                            var t = Object(xe.a)(e, 2),
                                              n = t[0],
                                              a = t[1],
                                              c = 'back' === n.direction ? r[a + 1].id : r[a - 1].id,
                                              o = 'back' === n.direction ? r[a - 1].id : r[a + 1].id,
                                              i = n.label || ''.concat(c, '-').concat(o);
                                            return { id: n.id, label: i, source: c, target: o, groups: n.groups ? n.groups.map(Ht) : void 0 };
                                          }),
                                        groups: a.map(Ht).filter(function(e, t, n) {
                                          return (
                                            n.findIndex(function(t) {
                                              return t.name === e.name;
                                            }) === t
                                          );
                                        }),
                                      };
                                    },
                                    path_nodes: function(e) {
                                      var t = Rt()(e.eval());
                                      return {
                                        nodes: t
                                          .filter(function(e) {
                                            return 'node' === e.type;
                                          })
                                          .map(Wt),
                                        groups: t
                                          .filter(function(e) {
                                            return 'group' === e.type;
                                          })
                                          .map(Ht)
                                          .filter(function(e, t, n) {
                                            return (
                                              n.findIndex(function(t) {
                                                return t.name === e.name;
                                              }) === t
                                            );
                                          }),
                                      };
                                    },
                                    partialPath: function(e, t) {
                                      return Rt()([e.eval(), t.eval()]);
                                    },
                                    node_nodeNoGroups: function(e, t, n) {
                                      return [{ type: 'node', id: t.eval() }];
                                    },
                                    node_nodeGroups: function(e, t, n, a) {
                                      var r = n.eval();
                                      return [{ type: 'node', id: t.eval(), groups: r.map(Ht) }].concat(Object(O.a)(r));
                                    },
                                    link_forwardWithLabel: function(e, t, n) {
                                      return [{ type: 'link', direction: 'forth', label: t.eval(), id: k()() }];
                                    },
                                    link_backwardWithLabel: function(e, t, n) {
                                      return [{ type: 'link', direction: 'back', label: t.eval(), id: k()() }];
                                    },
                                    link_forwardGroups: function(e, t, n, a) {
                                      var r = n.eval();
                                      return [
                                        At()(
                                          { type: 'link', direction: 'forth', label: t ? t.eval()[0] : void 0, id: k()(), groups: r.map(Ht) },
                                          Mt.a
                                        ),
                                      ].concat(Object(O.a)(r));
                                    },
                                    link_backwardGroups: function(e, t, n, a) {
                                      var r = n.eval();
                                      return [
                                        At()(
                                          { type: 'link', direction: 'back', label: t ? t.eval()[0] : void 0, id: k()(), groups: r.map(Ht) },
                                          Mt.a
                                        ),
                                      ].concat(Object(O.a)(r));
                                    },
                                    link_forward: function(e) {
                                      return [{ type: 'link', direction: 'forth', id: k()() }];
                                    },
                                    link_backward: function(e) {
                                      return [{ type: 'link', direction: 'back', id: k()() }];
                                    },
                                    groups_singleGroup: function(e, t) {
                                      return [{ type: 'group', name: t.eval() }];
                                    },
                                    groups_multipleGroups: function(e) {
                                      return Rt()(e.eval());
                                    },
                                    identifier_string: function(e) {
                                      return this.sourceString;
                                    },
                                    identifier_withBlanks: function(e, t, n) {
                                      return this.sourceString;
                                    },
                                  }));
                              case 2:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function() {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: 'match',
                value: function(e) {
                  return this.grammar.match(e);
                },
              },
              {
                key: 'eval',
                value: function(e) {
                  return this.semantics(e).eval();
                },
              },
            ]),
            e
          );
        })())();
      Bt.initialize();
      var zt = Bt,
        Kt = se.a.mark(un),
        qt = se.a.mark(sn),
        Vt = se.a.mark(pn),
        $t = se.a.mark(dn),
        Ut = 'grapher/SubgraphCreator/PROCESS',
        Jt = 'grapher/SubgraphCreator/PROCESS_SUCCESS',
        Xt = 'grapher/SubgraphCreator/PROCESS_FAILURE',
        Yt = 'grapher/SubgraphCreator/IMPORT',
        Zt = { nodes: [], links: [], groups: [], processing: !1, error: !1 };
      function Qt(e) {
        return { type: Ut, payload: e };
      }
      function en(e) {
        return { type: Jt, payload: e };
      }
      function tn() {
        return { type: Yt };
      }
      function nn(e) {
        return e.subgraphCreator;
      }
      var an = Object(f.a)(nn, function(e) {
          return e.error;
        }),
        rn = Object(f.a)(nn, function(e) {
          return e.nodes;
        }),
        cn = Object(f.a)(nn, function(e) {
          return e.links;
        }),
        on = Object(f.a)(nn, function(e) {
          return e.groups;
        }),
        ln = Object(f.a)(nn, function(e) {
          return e.processing;
        });
      function un(e) {
        var t, n, a;
        return se.a.wrap(function(r) {
          for (;;)
            switch ((r.prev = r.next)) {
              case 0:
                return (t = e.payload), (r.next = 3), Object(pe.b)(500);
              case 3:
                return (r.next = 5), Object(pe.a)([zt, 'match'], t);
              case 5:
                if ((n = r.sent).succeeded()) {
                  r.next = 11;
                  break;
                }
                return (r.next = 9), Object(pe.c)({ type: Xt });
              case 9:
                r.next = 16;
                break;
              case 11:
                return (r.next = 13), Object(pe.a)([zt, 'eval'], n);
              case 13:
                return (a = r.sent), (r.next = 16), Object(pe.c)(en(a));
              case 16:
              case 'end':
                return r.stop();
            }
        }, Kt);
      }
      function sn() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([Ut], un);
              case 2:
              case 'end':
                return e.stop();
            }
        }, qt);
      }
      function pn() {
        var e, t, n;
        return se.a.wrap(function(a) {
          for (;;)
            switch ((a.prev = a.next)) {
              case 0:
                return (a.next = 2), Object(pe.d)(rn);
              case 2:
                return (e = a.sent), (a.next = 5), Object(pe.d)(cn);
              case 5:
                return (t = a.sent), (a.next = 8), Object(pe.d)(on);
              case 8:
                return (n = a.sent), (a.next = 11), Object(pe.c)(B(e, t, n));
              case 11:
              case 'end':
                return a.stop();
            }
        }, Vt);
      }
      function dn() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([Yt], pn);
              case 2:
              case 'end':
                return e.stop();
            }
        }, $t);
      }
      var mn = function() {
          return localStorage.setItem('grapher/onboarding/dimissed', 'true');
        },
        fn = se.a.mark(jn),
        gn = se.a.mark(kn),
        hn = 'grapher/Onboarding/DISMISS',
        bn = function() {
          return { type: hn };
        },
        En = function() {
          return { type: 'grapher/Onboarding/SHOW' };
        },
        vn = { open: !('true' === localStorage.getItem('grapher/onboarding/dimissed')) },
        On = Object(f.a)(
          function(e) {
            return e.onboarding;
          },
          function(e) {
            return e.open;
          }
        );
      function jn() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.a)(mn);
              case 2:
              case 'end':
                return e.stop();
            }
        }, fn);
      }
      function kn() {
        return se.a.wrap(function(e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), Object(pe.e)([hn], jn);
              case 2:
              case 'end':
                return e.stop();
            }
        }, gn);
      }
      var yn = Object(p.a)(),
        Nn = Object(s.c)({
          graphList: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ne,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case N:
                var n = t.payload,
                  a = n.id,
                  r = n.name;
                return Object(m.a)({}, e, Object(d.a)({}, a, r));
              case D:
                var c = t.payload,
                  o = Object(m.a)({}, e);
                return delete o[c], o;
              case y:
                var i = t.payload,
                  l = i.id,
                  u = i.name;
                return Object(m.a)({}, e, Object(d.a)({}, l, u));
              default:
                return e;
            }
          },
          graph: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : V,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case y:
                var n = t.payload.name;
                return Object(m.a)({}, e, { name: n });
              case N:
                var a = t.payload;
                return Object(m.a)({}, e, { name: '', nodes: {}, links: {} }, a);
              case x:
                return Object(m.a)({}, t.payload);
              case C:
                var r = t.payload;
                return Object(m.a)({}, e, { nodes: Object(m.a)({}, e.nodes, Object(d.a)({}, r.id, r)) });
              case G:
                var c = t.payload,
                  o = Object.keys(e.links)
                    .filter(function(t) {
                      return e.links[t].source !== c && e.links[t].target !== c;
                    })
                    .reduce(function(t, n) {
                      return Object(m.a)({}, t, Object(d.a)({}, n, e.links[n]));
                    }, {}),
                  i = Object(m.a)({}, e.nodes);
                return delete i[c], Object(m.a)({}, e, { nodes: i, links: o });
              case S:
                var l = t.payload,
                  u = k()();
                return Object(m.a)({}, e, {
                  links: Object(m.a)({}, e.links, Object(d.a)({}, u, Object(m.a)({ id: u, label: ''.concat(l.source, '-').concat(l.target) }, l))),
                });
              case I:
                var s = t.payload,
                  p = Object(m.a)({}, e.links);
                return delete p[s], Object(m.a)({}, e, { links: p });
              case L:
                var f = t.payload,
                  g = f.oldId,
                  h = f.node,
                  b = Object(m.a)({}, e.nodes);
                delete b[g];
                var E = Object.keys(e.links)
                  .map(function(t) {
                    var n = e.links[t];
                    return (
                      n.source === g && (n = Object(m.a)({}, n, { source: h.id })), n.target === g && (n = Object(m.a)({}, n, { target: h.id })), n
                    );
                  })
                  .reduce(function(e, t) {
                    return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                  }, {});
                return Object(m.a)({}, e, { nodes: Object(m.a)({}, b, Object(d.a)({}, h.id, h)), links: E });
              case _:
                var v = t.payload;
                return Object(m.a)({}, e, { links: Object(m.a)({}, e.links, Object(d.a)({}, v.id, v)) });
              case T:
                var j = t.payload,
                  w = j.nodes,
                  D = j.links,
                  F = t.payload.groups,
                  M = (F = F.map(function(t) {
                    var n = Object.values(e.groups).find(function(e) {
                      return e.name === t.name;
                    });
                    return n || t;
                  })).reduce(function(e, t) {
                    return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                  }, {}),
                  H = w
                    .map(function(t) {
                      var n = e.nodes[t.id] || {},
                        a = []
                          .concat(
                            Object(O.a)(n.groups || []),
                            Object(O.a)(
                              (t.groups || []).map(function(e) {
                                return F.find(function(t) {
                                  return t.name === e.name;
                                });
                              })
                            )
                          )
                          .filter(function(e, t, n) {
                            return (
                              n.findIndex(function(t) {
                                return t.name === e.name;
                              }) === t
                            );
                          });
                      return Object(m.a)({}, n, t, { groups: a });
                    })
                    .reduce(function(e, t) {
                      return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                    }, {}),
                  W = D.map(function(t) {
                    var n =
                        Object.values(e.links).find(function(e) {
                          var n = e.source,
                            a = e.target;
                          return n === t.source && a === t.target;
                        }) || {},
                      a = []
                        .concat(
                          Object(O.a)(n.groups || []),
                          Object(O.a)(
                            (t.groups || []).map(function(e) {
                              return F.find(function(t) {
                                return t.name === e.name;
                              });
                            })
                          )
                        )
                        .filter(function(e, t, n) {
                          return (
                            n.findIndex(function(t) {
                              return t.name === e.name;
                            }) === t
                          );
                        });
                    return Object(m.a)({}, n, t, { groups: a, id: n.id || t.id });
                  }).reduce(function(e, t) {
                    return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                  }, {});
                return Object(m.a)({}, e, {
                  nodes: Object(m.a)({}, e.nodes, H),
                  links: Object(m.a)({}, e.links, W),
                  groups: Object(m.a)({}, e.groups, M),
                });
              case R:
                var B = t.payload;
                return Object(m.a)({}, e, { groups: Object(m.a)({}, e.groups, Object(d.a)({}, B.id, B)) });
              case P:
                var z = t.payload,
                  K = Object(m.a)({}, e.groups);
                delete K[z];
                var q = Object.keys(e.nodes)
                    .map(function(t) {
                      return e.nodes[t];
                    })
                    .map(function(e) {
                      return Object(m.a)({}, e, {
                        groups: (e.groups || []).filter(function(e) {
                          return e.id !== z;
                        }),
                      });
                    })
                    .reduce(function(e, t) {
                      return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                    }, {}),
                  $ = Object.keys(e.links)
                    .map(function(t) {
                      return e.links[t];
                    })
                    .map(function(e) {
                      return Object(m.a)({}, e, {
                        groups: (e.groups || []).filter(function(e) {
                          return e.id !== z;
                        }),
                      });
                    })
                    .reduce(function(e, t) {
                      return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                    }, {});
                return Object(m.a)({}, e, { groups: Object(m.a)({}, K), nodes: q, links: $ });
              case A:
                var U = t.payload,
                  J = Object.keys(e.nodes)
                    .map(function(t) {
                      return e.nodes[t];
                    })
                    .map(function(e) {
                      var t = e.groups ? Object(O.a)(e.groups) : [],
                        n = t.findIndex(function(e) {
                          return e.id === U.id;
                        });
                      return n >= 0 ? (t.splice(n, 1), Object(m.a)({}, e, { groups: [].concat(Object(O.a)(t), [U]) })) : e;
                    })
                    .reduce(function(e, t) {
                      return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                    }, {}),
                  X = Object.keys(e.links)
                    .map(function(t) {
                      return e.links[t];
                    })
                    .map(function(e) {
                      var t = e.groups ? Object(O.a)(e.groups) : [],
                        n = t.findIndex(function(e) {
                          return e.id === U.id;
                        });
                      return n >= 0 ? (t.splice(n, 1), Object(m.a)({}, e, { groups: [].concat(Object(O.a)(t), [U]) })) : e;
                    })
                    .reduce(function(e, t) {
                      return Object(m.a)({}, e, Object(d.a)({}, t.id, t));
                    }, {});
                return Object(m.a)({}, e, { groups: Object(m.a)({}, e.groups, Object(d.a)({}, U.id, U)), nodes: J, links: X });
              default:
                return e;
            }
          },
          nodeSelection: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Le,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case Ge:
                var n = e.selectedNodes;
                return Object(m.a)({}, e, { selectedNodes: [].concat(Object(O.a)(n.slice(n.length === Ce ? 1 : 0)), [t.payload]) });
              case Ie:
              case G:
                return Object(m.a)({}, e, {
                  selectedNodes: e.selectedNodes.filter(function(e) {
                    return e.id !== t.payload;
                  }),
                });
              case L:
                var a = t.payload,
                  r = a.oldId,
                  c = a.node;
                return Object(m.a)({}, e, {
                  selectedNodes: e.selectedNodes.map(function(e) {
                    return e.id === r ? c : e;
                  }),
                });
              default:
                return e;
            }
          },
          linkSelection: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Fe,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case Pe:
                return Object(m.a)({}, e, { selectedLink: t.payload });
              case Ae:
                return Object(m.a)({}, e, { selectedLink: void 0 });
              case I:
                var n = (e.selectedLink || {}).id;
                return Object(m.a)({}, e, { selectedLink: n === t.payload ? void 0 : e.selectedLink });
              case G:
                var a = t.payload,
                  r = e.selectedLink || {},
                  c = r.source,
                  o = r.target;
                return Object(m.a)({}, e, { selectedLink: a !== c && a !== o ? e.selectedLink : void 0 });
              case L:
                var i,
                  l = t.payload,
                  u = l.oldId,
                  s = l.node;
                return (
                  e.selectedLink &&
                    (i = {
                      source: e.selectedLink.source === u ? s.id : e.selectedLink.source,
                      target: e.selectedLink.target === u ? s.id : e.selectedLink.target,
                    }),
                  Object(m.a)({}, e, { selectedLink: i })
                );
              case _:
                var p = (e.selectedLink || {}).id,
                  d = t.payload;
                return Object(m.a)({}, e, { selectedLink: p === d.id ? d : e.selectedLink });
              default:
                return e;
            }
          },
          dialog: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : bt,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case gt:
                var n = t.payload,
                  a = n.dialogId,
                  r = n.metadata;
                return Object(m.a)({}, e, Object(d.a)({}, a, { isOpen: !0, metadata: r }));
              case ht:
                var c = t.payload;
                return Object(m.a)({}, e, Object(d.a)({}, c, { isOpen: !1, metadata: void 0 }));
              default:
                return e;
            }
          },
          canvas: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ct,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case wt:
                return Object(m.a)({}, e, { canvasComponent: t.payload });
              default:
                return e;
            }
          },
          graphImport: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Je,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case Ue:
                return Object(m.a)({}, e, { errors: t.payload });
              case $e:
              case Ve:
                return Object(m.a)({}, e, { errors: [] });
              default:
                return e;
            }
          },
          subgraphCreator: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Zt,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case Ut:
                return Object(m.a)({}, e, { processing: !0 });
              case Jt:
                var n = t.payload,
                  a = n.nodes,
                  r = n.links,
                  c = n.groups;
                return Object(m.a)({}, e, { nodes: a, links: r, groups: c, error: !1, processing: !1 });
              case Xt:
                return Object(m.a)({}, e, { error: !0, processing: !1 });
              default:
                return e;
            }
          },
          onboarding: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : vn;
            switch ((arguments.length > 1 ? arguments[1] : void 0).type) {
              case hn:
                return Object(m.a)({}, e, { open: !1 });
              case 'grapher/Onboarding/SHOW':
                return Object(m.a)({}, e, { open: !0 });
              default:
                return e;
            }
          },
        }),
        wn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || s.d,
        xn = Object(s.e)(Nn, wn(Object(s.a)(yn)));
      yn.run(ve), yn.run(je), yn.run(mt), yn.run(ye), yn.run(Lt), yn.run(tt), yn.run(sn), yn.run(dn), yn.run(kn);
      var Cn = n(346),
        Sn = n(300),
        Gn = n(348),
        In = n(725),
        Ln = n(758),
        Dn = n(726),
        _n = n(732),
        Tn = n(757),
        Rn = n(722),
        Pn = n(723),
        An = n(110),
        Fn = n(6),
        Mn = n(69),
        Hn = n(671),
        Wn = n(303),
        Bn = n.n(Wn),
        zn = n(4);
      var Kn = Object(Fn.a)(
        function(e) {
          return { root: { marginLeft: -e.spacing(2), marginRight: e.spacing(3) } };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.onBack,
          n = e.classes,
          a = e.className,
          c = Object(Mn.a)(e, ['onBack', 'classes', 'className']);
        return r.a.createElement(
          Hn.a,
          Object.assign({ color: 'inherit', className: Object(zn.a)(n.root, a) }, c, { onClick: t }),
          r.a.createElement(Bn.a, null)
        );
      });
      var qn = Object(Fn.a)({ title: { flexGrow: 1 } })(function(e) {
        var t = e.title,
          n = e.onBack,
          a = e.classes,
          c = e.children;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            Rn.a,
            null,
            r.a.createElement(
              Pn.a,
              null,
              !!n && r.a.createElement(Kn, { onBack: n }),
              r.a.createElement(An.a, { className: a.title, variant: 'h6', color: 'inherit' }, t),
              c
            )
          ),
          r.a.createElement(Pn.a, null)
        );
      });
      var Vn = Object(c.b)(
          function() {
            return { title: 'New graph' };
          },
          function(e) {
            return {
              saveNewGraph: function(t) {
                return e(F({ name: t }));
              },
              openGraphList: function() {
                return e(pt());
              },
              cancelNewGraph: function() {
                return e(pt());
              },
            };
          }
        )(function(e) {
          var t = e.title,
            n = e.saveNewGraph,
            c = e.cancelNewGraph,
            o = e.openGraphList,
            i = Object(a.useState)(''),
            l = Object(xe.a)(i, 2),
            u = l[0],
            s = l[1],
            p = Object(a.useState)(!1),
            d = Object(xe.a)(p, 2),
            m = d[0],
            f = d[1];
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(qn, { title: 'New graph', onBack: o }),
            r.a.createElement(
              Ln.a,
              { open: !0 },
              r.a.createElement(In.a, null, t),
              r.a.createElement(
                'form',
                {
                  onSubmit: function(e) {
                    e.preventDefault(),
                      (function(e, t, n) {
                        !(function(e) {
                          return !!e.trim();
                        })(e)
                          ? t(!0)
                          : (t(!1), n(e));
                      })(u, f, n);
                  },
                },
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(Tn.a, {
                    error: m,
                    label: 'Graph name',
                    onChange: function(e) {
                      return s(e.target.value);
                    },
                    value: u,
                  })
                ),
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(_n.a, { onClick: c, className: 'cancel', type: 'button' }, 'Cancel'),
                  r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                )
              )
            )
          );
        }),
        $n = n(342),
        Un = n(131),
        Jn = n.n(Un),
        Xn = n(130),
        Yn = n.n(Xn),
        Zn = n(128),
        Qn = n.n(Zn);
      var ea = function(e, t, n) {
          e.selected &&
            (function(e, t) {
              var n = e.color === Yn.a.A200 ? Jn.a.A200 : Yn.a.A200;
              (t.strokeStyle = n), (t.fillStyle = n), t.beginPath(), t.arc(e.x, e.y, 6, 0, 2 * Math.PI), t.fill();
            })(e, t),
            (function(e, t) {
              var n = (function(e) {
                var t = e.color;
                if (t) return t;
                var n = Qn()(e, 'groups[0].color');
                return n || Jn.a.A200;
              })(e);
              (t.strokeStyle = n), (t.fillStyle = n), t.beginPath(), t.arc(e.x, e.y, 5, 0, 2 * Math.PI), t.fill();
            })(e, t),
            (function(e, t, n) {
              var a = n;
              (t.font = ''.concat(a, 'px Sans-Serif')),
                (t.textAlign = 'center'),
                (t.textBaseline = 'middle'),
                (t.fillStyle = '#000'),
                t.fillText(e.id, e.x, e.y + 8);
            })(e, t, n);
        },
        ta = n(308),
        na = n.n(ta);
      function aa(e) {
        var t = Qn()(e, 'groups[0].color');
        if (t) return t;
        var n = e.virtual,
          a = void 0 !== n && n,
          r = e.selected,
          c = void 0 !== r && r,
          o = e.artificial,
          i = void 0 !== o && o;
        return a ? Jn.a.A200 : c ? Yn.a.A200 : i ? 'rgba(0, 0, 0, 0)' : na.a[300];
      }
      var ra = function(e, t) {
          var n = window.innerWidth < 600 ? 60 : 70;
          e({ width: t.current.clientWidth, height: window.innerHeight - n });
        },
        ca = function(e, t) {
          return t.filter(function(t) {
            return t.source === e.id || t.target === e.id;
          }).length;
        };
      var oa = Object(c.b)(
          function(e) {
            return { nodes: te(e), links: ne(e), selectedNodes: Te(e), virtualLink: Re(e), selectedLink: We(e), linksIdsWithOpposite: ce(e) };
          },
          function(e) {
            return Object(m.a)(
              {},
              Object(s.b)({ selectNode: De, deselectNode: _e, createLink: W, selectLink: Me, deselectLink: He, registerCanvasComponent: St }, e),
              {
                openNewNode: function() {
                  return e(Et(ft.NEW_NODE));
                },
                openEditNode: function(t) {
                  return e(Et(ft.EDIT_NODE, t));
                },
                openConfirmDeleteLink: function(t) {
                  return e(Et(ft.CONFIRM_DELETE_LINK, t));
                },
                openConfirmDeleteNode: function(t) {
                  return e(Et(ft.CONFIRM_DELETE_NODE, t));
                },
              }
            );
          }
        )(function(e) {
          var t = e.registerCanvasComponent,
            n = e.linksIdsWithOpposite,
            c = e.nodes,
            o = void 0 === c ? [] : c,
            i = e.selectedNodes,
            l = void 0 === i ? [] : i,
            u = e.selectNode,
            s = e.deselectNode,
            p = e.openEditNode,
            d = e.openConfirmDeleteNode,
            f = e.links,
            g = void 0 === f ? [] : f,
            h = e.selectedLink,
            b = e.createLink,
            E = e.selectLink,
            v = e.deselectLink,
            j = e.virtualLink,
            k = e.openConfirmDeleteLink,
            y = e.openNewNode,
            N = e.className,
            w = Object(a.useRef)(null),
            x = Object(a.useRef)(null);
          Object(a.useEffect)(
            function() {
              t && t(w.current);
            },
            [t]
          );
          var C = Object(a.useState)({ width: window.innerWidth, height: window.innerHeight }),
            S = Object(xe.a)(C, 2),
            G = S[0],
            I = S[1];
          Object(a.useEffect)(function() {
            ra(I, x);
            var e = function() {
              return ra(I, x);
            };
            return (
              window.addEventListener('resize', e),
              function() {
                return window.removeEventListener('resize', e);
              }
            );
          }, []);
          var L = Object(a.useState)(void 0),
            D = Object(xe.a)(L, 2),
            _ = D[0],
            T = D[1];
          Object(a.useEffect)(
            function() {
              if (w.current.zoom) {
                var e = w.current.zoom();
                _ || (w.current.zoom(5 * e), T(e));
              }
            },
            [_]
          );
          var R = Object(a.useState)([]),
            P = Object(xe.a)(R, 2),
            A = P[0],
            F = P[1];
          Object(a.useEffect)(
            function() {
              F(function(e) {
                var t = g.map(function(t) {
                  var n = e.find(function(e) {
                    var n = e.id;
                    return t.id === n;
                  });
                  return Object(m.a)({}, n, t, { original: t, selected: t.id === (h || {}).id, virtual: !1, artificial: !1 });
                });
                j && (t = [].concat(Object(O.a)(t), [Object(m.a)({}, j, { original: j, virtual: !0 })]));
                var n = o.reverse().find(function(e) {
                  return ca(e, g) > 0;
                });
                return (
                  n
                    ? (t = [].concat(
                        Object(O.a)(t),
                        Object(O.a)(
                          o
                            .filter(function(e) {
                              return 0 === ca(e, g);
                            })
                            .map(function(e) {
                              return { source: n.id, target: e.id, artificial: !0 };
                            })
                        )
                      ))
                    : o.length > 0 &&
                      (t = [].concat(
                        Object(O.a)(t),
                        Object(O.a)(
                          new Array(o.length - 1).fill(void 0).map(function(e, t) {
                            return { source: o[t].id, target: o[t + 1].id, artificial: !0 };
                          })
                        )
                      )),
                  t
                );
              });
            },
            [g, j, o, l, h]
          );
          var M = Object(a.useState)([]),
            H = Object(xe.a)(M, 2),
            W = H[0],
            B = H[1];
          return (
            Object(a.useEffect)(
              function() {
                B(function(e) {
                  return o.map(function(t) {
                    var n = e.find(function(e) {
                      return e.id === t.id;
                    });
                    return Object(m.a)({}, n, t, {
                      degree: ca(t, g),
                      selected: !!l.find(function(e) {
                        return e.id === t.id;
                      }),
                    });
                  });
                });
              },
              [o, g, l]
            ),
            r.a.createElement(
              'div',
              {
                className: N,
                onDoubleClick: y,
                tabIndex: '0',
                onKeyUp: function(e) {
                  switch (e.key) {
                    case 'Backspace':
                    case 'Delete':
                      l.length && !h
                        ? d(
                            l.map(function(e) {
                              return e.id;
                            })
                          )
                        : !l.length && h && k(h.id);
                      break;
                    case 'Enter':
                      1 === l.length && p(l[0]);
                  }
                },
                ref: x,
              },
              r.a.createElement($n.a, {
                ref: w,
                graphData: { nodes: W, links: A },
                width: G.width,
                height: G.height,
                enableNodeDrag: !0,
                nodeCanvasObject: ea,
                nodeLabel: 'id',
                linkDirectionalArrowLength: 5,
                linkDirectionalArrowRelPos: 1,
                linkColor: aa,
                linkWidth: 3,
                linkDirectionalParticles: 4,
                linkDirectionalParticleWidth: function(e) {
                  return e.selected ? 4 : 0;
                },
                linkLabel: 'label',
                linkCurvature: function(e) {
                  var t = e.id;
                  return n.find(function(e) {
                    return e === t;
                  })
                    ? 0.3
                    : 0;
                },
                onNodeClick: function(e) {
                  if (
                    l.find(function(t) {
                      return t.id === e.id;
                    }) &&
                    s
                  )
                    s(e.id);
                  else if (u) {
                    var t = o.find(function(t) {
                      return t.id === e.id;
                    });
                    u(t);
                  }
                },
                onLinkClick: function(e) {
                  var t = e.original;
                  e.virtual ? b(t) : e.selected ? v(t) : E(t);
                },
              })
            )
          );
        }),
        ia = n(750),
        la = n(754),
        ua = n(734),
        sa = n(730),
        pa = n(673),
        da = n(733);
      var ma = function(e) {
        var t = e.isOpen,
          n = e.nodeIds,
          a = void 0 === n ? [] : n,
          c = e.deleteNodes,
          o = e.cancel,
          i = a.length > 1 ? 'nodes' : 'node',
          l = a.length > 1 ? 'these' : 'this',
          u = a.map(function(e) {
            return r.a.createElement(pa.a, { key: e }, r.a.createElement(da.a, { primary: e }));
          });
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Delete ', i, '?'),
          r.a.createElement(Dn.a, null, r.a.createElement(ua.a, null, 'You are about to delete ', l, ' ', i, ':'), r.a.createElement(sa.a, null, u)),
          r.a.createElement(
            Dn.a,
            null,
            r.a.createElement(_n.a, { onClick: o, className: 'cancel' }, 'Cancel'),
            r.a.createElement(
              _n.a,
              {
                onClick: function() {
                  return c(a);
                },
                className: 'delete',
                color: 'primary',
              },
              'Delete'
            )
          )
        );
      };
      var fa = Object(c.b)(
        function(e) {
          return { isOpen: jt(e, ft.CONFIRM_DELETE_NODE), nodeIds: kt(e, ft.CONFIRM_DELETE_NODE) };
        },
        function(e) {
          return {
            deleteNodes: function(t) {
              t.forEach(function(t) {
                return e(
                  (function(e) {
                    return { type: G, payload: e };
                  })(t)
                );
              }),
                e(vt(ft.CONFIRM_DELETE_NODE));
            },
            cancel: function() {
              return e(vt(ft.CONFIRM_DELETE_NODE));
            },
          };
        }
      )(ma);
      var ga = function(e) {
        var t = e.isOpen,
          n = e.linkLabel,
          a = e.linkId,
          c = e.deleteLink,
          o = e.cancel;
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Delete ', n, '?'),
          r.a.createElement(Dn.a, null, r.a.createElement(ua.a, null, 'You are about to delete this link: ', n)),
          r.a.createElement(
            Dn.a,
            null,
            r.a.createElement(_n.a, { onClick: o, className: 'cancel' }, 'Cancel'),
            r.a.createElement(
              _n.a,
              {
                onClick: function() {
                  return c(a);
                },
                className: 'delete',
                color: 'primary',
              },
              'Delete'
            )
          )
        );
      };
      var ha = Object(c.b)(
        function(e) {
          var t = kt(e, ft.CONFIRM_DELETE_LINK),
            n = (
              (function(e, t) {
                return ee(e)[t];
              })(e, t) || {}
            ).label;
          return { isOpen: jt(e, ft.CONFIRM_DELETE_LINK), linkId: t, linkLabel: n };
        },
        function(e) {
          return {
            deleteLink: function(t) {
              e(
                (function(e) {
                  return { type: I, payload: e };
                })(t)
              ),
                e(vt(ft.CONFIRM_DELETE_LINK));
            },
            cancel: function() {
              return e(vt(ft.CONFIRM_DELETE_LINK));
            },
          };
        }
      )(ga);
      var ba = function(e) {
        var t = e.isOpen,
          n = e.graphName,
          a = e.graphId,
          c = e.deleteGraph,
          o = e.cancel;
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Delete ', n, '?'),
          r.a.createElement(Dn.a, null, r.a.createElement(ua.a, null, 'You are about to delete this graph: ', n)),
          r.a.createElement(
            Dn.a,
            null,
            r.a.createElement(_n.a, { onClick: o, className: 'cancel' }, 'Cancel'),
            r.a.createElement(
              _n.a,
              {
                onClick: function() {
                  return c(a);
                },
                className: 'delete',
                color: 'primary',
              },
              'Delete'
            )
          )
        );
      };
      var Ea = Object(c.b)(
        function(e) {
          return { isOpen: jt(e, ft.CONFIRM_DELETE_GRAPH), graphName: kt(e, ft.CONFIRM_DELETE_GRAPH), graphId: Y(e) };
        },
        function(e) {
          return {
            deleteGraph: function(t) {
              e({ type: D, payload: t }), e(vt(ft.CONFIRM_DELETE_GRAPH));
            },
            cancel: function() {
              return e(vt(ft.CONFIRM_DELETE_GRAPH));
            },
          };
        }
      )(ba);
      var va = function() {
          return r.a.createElement(r.a.Fragment, null, r.a.createElement(fa, null), r.a.createElement(ha, null), r.a.createElement(Ea, null));
        },
        Oa = n(105),
        ja = n(106),
        ka = n(735),
        ya = n(737),
        Na = n(736),
        wa = n(762);
      var xa = Object(Fn.a)(
        function(e) {
          return { chip: { marginRight: e.spacing(1) } };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.node,
          n = e.openConfirmDeleteNode,
          a = e.className,
          c = e.openEditNode,
          o = e.classes,
          i = (t.groups || []).map(function(e) {
            return r.a.createElement(wa.a, { key: e.id, label: e.name, size: 'small', color: 'secondary', className: o.chip });
          });
        return r.a.createElement(
          ka.a,
          { className: a },
          r.a.createElement(
            Na.a,
            null,
            r.a.createElement(An.a, { color: 'textSecondary', gutterBottom: !0 }, 'Node'),
            r.a.createElement(An.a, { component: 'h2', variant: 'h5' }, t.id),
            i
          ),
          r.a.createElement(
            ya.a,
            null,
            r.a.createElement(
              _n.a,
              {
                className: 'delete',
                size: 'small',
                onClick: function() {
                  return n([t.id]);
                },
              },
              'Delete'
            ),
            r.a.createElement(
              _n.a,
              {
                className: 'edit',
                size: 'small',
                onClick: function() {
                  return c(t);
                },
              },
              'Edit'
            )
          )
        );
      });
      function Ca() {
        var e = Object(Oa.a)(['\n  margin-bottom: 1rem;\n']);
        return (
          (Ca = function() {
            return e;
          }),
          e
        );
      }
      var Sa = Object(ja.a)(xa)(Ca());
      var Ga = function(e) {
        var t = e.nodes,
          n = void 0 === t ? [] : t,
          a = Object(Mn.a)(e, ['nodes']);
        return n.map(function(e) {
          return r.a.createElement(Sa, Object.assign({ key: e.id, node: e }, a));
        });
      };
      var Ia = Object(c.b)(
        function(e) {
          return { nodes: Te(e) };
        },
        function(e) {
          return {
            openEditNode: function(t) {
              return e(Et(ft.EDIT_NODE, t));
            },
            openConfirmDeleteNode: function(t) {
              return e(Et(ft.CONFIRM_DELETE_NODE, t));
            },
          };
        }
      )(Ga);
      var La = Object(Fn.a)(
        function(e) {
          return { chip: { marginRight: e.spacing(1) } };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.link,
          n = e.openConfirmDeleteLink,
          a = e.openEditLink,
          c = e.className,
          o = e.classes;
        if (!t) return null;
        var i = (t.groups || []).map(function(e) {
          return r.a.createElement(wa.a, { key: e.id, label: e.name, size: 'small', color: 'secondary', className: o.chip });
        });
        return r.a.createElement(
          ka.a,
          { className: c },
          r.a.createElement(
            Na.a,
            null,
            r.a.createElement(An.a, { color: 'textSecondary', gutterBottom: !0 }, 'Link'),
            r.a.createElement(An.a, { component: 'h2', variant: 'h5' }, t.label),
            i
          ),
          r.a.createElement(
            ya.a,
            null,
            r.a.createElement(
              _n.a,
              {
                className: 'delete',
                size: 'small',
                onClick: function() {
                  return n(t.id);
                },
              },
              'Delete'
            ),
            r.a.createElement(
              _n.a,
              {
                className: 'edit',
                size: 'small',
                onClick: function() {
                  return a(t);
                },
              },
              'Edit'
            )
          )
        );
      });
      var Da = Object(c.b)(
        function(e) {
          return { link: We(e) };
        },
        function(e) {
          return {
            openEditLink: function(t) {
              return e(Et(ft.EDIT_LINK, t));
            },
            openConfirmDeleteLink: function(t) {
              return e(Et(ft.CONFIRM_DELETE_LINK, t));
            },
          };
        }
      )(La);
      var _a = Object(Fn.a)(
          function(e) {
            return { link: { marginBottom: e.spacing(1) } };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            n = void 0 === t ? {} : t,
            a = e.className;
          return r.a.createElement('div', { className: a }, r.a.createElement(Da, { className: n.link }), r.a.createElement(Ia, null));
        }),
        Ta = n(759),
        Ra = n(764),
        Pa = n(760),
        Aa = n(312),
        Fa = n.n(Aa),
        Ma = n(313),
        Ha = n.n(Ma),
        Wa = n(314),
        Ba = n.n(Wa);
      var za = function(e) {
        var t = e.openNewNode,
          n = e.openNewLink,
          c = e.refresh,
          o = Object(Mn.a)(e, ['openNewNode', 'openNewLink', 'refresh']),
          i = Object(a.useState)(!1),
          l = Object(xe.a)(i, 2),
          u = l[0],
          s = l[1];
        return r.a.createElement(
          Ta.a,
          Object.assign(
            {
              ariaLabel: 'Actions',
              open: u,
              icon: r.a.createElement(Ra.a, null),
              onClick: function() {
                return s(!u);
              },
              onClose: function() {
                return s(!1);
              },
              onFocus: function() {
                return s(!0);
              },
              onBlur: function() {
                return s(!1);
              },
              onMouseEnter: function() {
                return s(!0);
              },
              onMouseLeave: function() {
                return s(!1);
              },
              direction: 'up',
            },
            o
          ),
          r.a.createElement(Pa.a, { key: 'add-node', icon: r.a.createElement(Fa.a, null), tooltipTitle: 'Add node', onClick: t, tooltipOpen: !0 }),
          r.a.createElement(Pa.a, { key: 'add-link', icon: r.a.createElement(Ha.a, null), tooltipTitle: 'Add link', onClick: n, tooltipOpen: !0 }),
          r.a.createElement(Pa.a, { key: 'refresh', icon: r.a.createElement(Ba.a, null), tooltipTitle: 'Refresh', onClick: c, tooltipOpen: !0 })
        );
      };
      var Ka = Object(c.b)(void 0, function(e) {
          return {
            openNewNode: function() {
              return e(Et(ft.NEW_NODE));
            },
            openNewLink: function() {
              return e(Et(ft.NEW_LINK));
            },
            refresh: function() {
              return e({ type: xt });
            },
          };
        })(za),
        qa = n(56),
        Va = n(20),
        $a = n(30),
        Ua = n(727),
        Ja = n(756),
        Xa = n(674),
        Ya = n(739),
        Za = n(728),
        Qa = n(763),
        er = Object(Xa.a)(function(e) {
          return {
            selectFormControl: { display: 'block' },
            select: { width: '100%' },
            chips: { display: 'flex', flexWrap: 'wrap' },
            chip: { margin: e.spacing(0.5) },
          };
        }),
        tr = { PaperProps: { style: { maxHeight: 224, width: 250 } } };
      function nr(e) {
        var t = e.groups,
          n = e.selectedGroups,
          c = e.onChange,
          o = er(),
          i = Object(a.useState)(!1),
          l = Object(xe.a)(i, 2),
          u = l[0],
          s = l[1];
        return r.a.createElement(
          Za.a,
          { className: o.selectFormControl },
          r.a.createElement(Qa.a, { htmlFor: 'groups' }, 'Groups'),
          r.a.createElement(
            Ja.a,
            {
              open: u,
              multiple: !0,
              value: n,
              onChange: function(e) {
                c(e.target.value), s(!1);
              },
              onOpen: function() {
                return s(!0);
              },
              input: r.a.createElement(Ua.a, null),
              renderValue: function(e) {
                return r.a.createElement(
                  'div',
                  { className: o.chips },
                  e.map(function(e) {
                    return r.a.createElement(wa.a, { key: e.id, label: e.name, className: o.chip });
                  })
                );
              },
              MenuProps: tr,
              inputProps: { id: 'groups' },
              className: o.select,
            },
            t.map(function(e) {
              return r.a.createElement(Ya.a, { key: e.id, value: e }, e.name);
            })
          )
        );
      }
      var ar = { id: '', groups: [] },
        rr = $a.object().shape({ id: $a.string().required('Required'), groups: $a.array() });
      var cr = Object(c.b)(
          function(e) {
            return { isOpen: jt(e, ft.NEW_NODE), groups: le(e) };
          },
          function(e) {
            return {
              saveNewNode: function(t) {
                e(
                  (function(e) {
                    return { type: C, payload: Object(m.a)({}, e) };
                  })(t)
                ),
                  e(vt(ft.NEW_NODE));
              },
              cancelNewNode: function() {
                return e(vt(ft.NEW_NODE));
              },
            };
          }
        )(function(e) {
          var t = e.isOpen,
            n = e.groups,
            a = void 0 === n ? [] : n,
            c = e.saveNewNode,
            o = e.cancelNewNode;
          return r.a.createElement(
            Ln.a,
            { open: t },
            r.a.createElement(In.a, null, 'New node'),
            r.a.createElement(Va.c, {
              initialValues: ar,
              validationSchema: rr,
              onSubmit: c,
              render: function(e) {
                var t = e.errors,
                  n = e.values,
                  c = e.setFieldValue;
                return r.a.createElement(
                  Va.b,
                  null,
                  r.a.createElement(
                    Dn.a,
                    null,
                    r.a.createElement(Va.a, { type: 'text', label: 'ID', name: 'id', component: qa.a, error: !!t.id }),
                    r.a.createElement(nr, {
                      groups: a,
                      selectedGroups: n.groups,
                      onChange: function(e) {
                        return c('groups', e);
                      },
                    })
                  ),
                  r.a.createElement(
                    Dn.a,
                    null,
                    r.a.createElement(_n.a, { onClick: o, className: 'cancel', type: 'button' }, 'Cancel'),
                    r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                  )
                );
              },
            })
          );
        }),
        or = n(317),
        ir = n.n(or),
        lr = n(320),
        ur = n(350),
        sr = n(319),
        pr = n.n(sr),
        dr = n(318);
      function mr(e) {
        var t = e.inputRef,
          n = Object(Mn.a)(e, ['inputRef']);
        return r.a.createElement('div', Object.assign({ ref: t }, n));
      }
      var fr = {
        Control: function(e) {
          return r.a.createElement(
            Tn.a,
            Object.assign(
              {
                fullWidth: !0,
                InputProps: {
                  inputComponent: mr,
                  inputProps: Object(m.a)({ className: e.selectProps.classes.input, inputRef: e.innerRef, children: e.children }, e.innerProps),
                },
              },
              e.selectProps.textFieldProps
            )
          );
        },
        Menu: function(e) {
          return r.a.createElement(ur.a, Object.assign({ square: !0, className: e.selectProps.classes.paper }, e.innerProps), e.children);
        },
        MultiValue: function(e) {
          return r.a.createElement(wa.a, {
            tabIndex: -1,
            label: e.children,
            className: ir()(e.selectProps.classes.chip, Object(d.a)({}, e.selectProps.classes.chipFocused, e.isFocused)),
            onDelete: e.removeProps.onClick,
            deleteIcon: r.a.createElement(pr.a, e.removeProps),
          });
        },
        NoOptionsMessage: function(e) {
          return r.a.createElement(
            An.a,
            Object.assign({ color: 'textSecondary', className: e.selectProps.classes.noOptionsMessage }, e.innerProps),
            e.children
          );
        },
        Option: function(e) {
          return r.a.createElement(
            Ya.a,
            Object.assign(
              { buttonRef: e.innerRef, selected: e.isFocused, component: 'div', style: { fontWeight: e.isSelected ? 500 : 400 } },
              e.innerProps
            ),
            e.children
          );
        },
        Placeholder: function(e) {
          return r.a.createElement(
            An.a,
            Object.assign({ color: 'textSecondary', className: e.selectProps.classes.placeholder }, e.innerProps),
            e.children
          );
        },
        SingleValue: function(e) {
          return r.a.createElement(An.a, Object.assign({ className: e.selectProps.classes.singleValue }, e.innerProps), e.children);
        },
        ValueContainer: function(e) {
          return r.a.createElement('div', { className: e.selectProps.classes.valueContainer }, e.children);
        },
      };
      var gr = Object(Fn.a)(function(e) {
          return {
            root: { flexGrow: 1, marginTop: e.spacing(2), marginBottom: e.spacing(2) },
            input: { display: 'flex', padding: 0 },
            valueContainer: { display: 'flex', flexWrap: 'wrap', flex: 1, alignItems: 'center', overflow: 'hidden' },
            chip: { margin: ''.concat(e.spacing(0.5), 'px ').concat(e.spacing(0.25), 'px') },
            chipFocused: { backgroundColor: Object(dr.emphasize)('light' === e.palette.type ? e.palette.grey[300] : e.palette.grey[700], 0.08) },
            noOptionsMessage: { padding: ''.concat(e.spacing(1), 'px ').concat(e.spacing(2), 'px') },
            singleValue: { fontSize: 16 },
            placeholder: { position: 'absolute', left: 2, fontSize: 16 },
            paper: { position: 'absolute', zIndex: 1, marginTop: e.spacing(1), left: 0, right: 0 },
            divider: { height: e.spacing(2) },
          };
        })(function(e) {
          return r.a.createElement(
            'div',
            { className: e.classes.root },
            r.a.createElement(
              lr.a,
              Object.assign(
                {
                  styles: {
                    input: function(e) {
                      return Object(m.a)({}, e, { '& input': { font: 'inherit' } });
                    },
                  },
                  components: fr,
                  textFieldProps: { InputLabelProps: { shrink: !0 } },
                },
                e
              )
            )
          );
        }),
        hr = (n(583), Object(Fn.a)({ root: { display: 'block !important' } })(qa.a));
      var br = function(e) {
        var t = e.isOpen,
          n = e.nodesIds,
          a = e.groups,
          c = void 0 === a ? [] : a,
          o = e.saveNewLink,
          i = e.cancelNewLink,
          l = { label: '', source: void 0, target: void 0, groups: [] },
          u = $a
            .object()
            .shape({ label: $a.string(), source: $a.string().required('Required'), target: $a.string().required('Required'), groups: $a.array() });
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'New link'),
          r.a.createElement(Va.c, {
            initialValues: l,
            validationSchema: u,
            onSubmit: function(e) {
              return o(Object(m.a)({}, e, { label: '' !== e.label.trim() ? e.label : ''.concat(e.source, '-').concat(e.target) }));
            },
            render: function(e) {
              var t = e.errors,
                a = e.setFieldValue,
                o = e.values;
              return r.a.createElement(
                Va.b,
                null,
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(Va.a, { type: 'text', label: 'Label', name: 'label', component: hr, error: !!t.label }),
                  r.a.createElement(gr, {
                    options: n.map(function(e) {
                      return { label: e, value: e };
                    }),
                    onChange: function(e) {
                      var t = e.value;
                      return a('source', t);
                    },
                    label: 'Source',
                    placeholder: 'Search a node',
                  }),
                  r.a.createElement(gr, {
                    options: n.map(function(e) {
                      return { label: e, value: e };
                    }),
                    onChange: function(e) {
                      var t = e.value;
                      return a('target', t);
                    },
                    label: 'Target',
                    placeholder: 'Search a node',
                  }),
                  r.a.createElement(nr, {
                    groups: c,
                    selectedGroups: o.groups,
                    onChange: function(e) {
                      return a('groups', e);
                    },
                  })
                ),
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(_n.a, { onClick: i, className: 'cancel', type: 'button' }, 'Cancel'),
                  r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                )
              );
            },
          })
        );
      };
      var Er = Object(c.b)(
          function(e) {
            return { isOpen: jt(e, ft.NEW_LINK), nodesIds: ae(e), groups: le(e) };
          },
          function(e) {
            return {
              saveNewLink: function(t) {
                e(W(t)), e(vt(ft.NEW_LINK));
              },
              cancelNewLink: function() {
                return e(vt(ft.NEW_LINK));
              },
            };
          }
        )(br),
        vr = n(177),
        Or = n(740),
        jr = n(741),
        kr = n(742),
        yr = n(743),
        Nr = n(744),
        wr = n(745),
        xr = n(176),
        Cr = n(323);
      var Sr = function(e) {
        var t = e.color,
          n = e.colors,
          c = e.onChange,
          o = Object(a.useState)(!1),
          i = Object(xe.a)(o, 2),
          l = i[0],
          u = i[1];
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(Tn.a, {
            label: 'Color',
            value: t,
            margin: 'normal',
            onFocus: function() {
              return u(!0);
            },
          }),
          l &&
            r.a.createElement(Cr.TwitterPicker, {
              width: 170,
              color: t,
              onChange: function(e) {
                var t = e.hex;
                return c(t);
              },
              colors: n,
            })
        );
      };
      function Gr() {
        var e = Object(Oa.a)(['\n  display: block !important;\n']);
        return (
          (Gr = function() {
            return e;
          }),
          e
        );
      }
      var Ir = Object(ja.a)(qa.a)(Gr()),
        Lr = [vr.a.A200, Or.a.A200, jr.a.A200, kr.a.A200, yr.a.A200, Nr.a.A200, wr.a[500], xr.a[500]];
      var Dr = function(e) {
        var t = e.isOpen,
          n = e.node,
          a = void 0 === n ? {} : n,
          c = e.nodesIds,
          o = void 0 === c ? [] : c,
          i = e.groups,
          l = void 0 === i ? [] : i,
          u = e.editNode,
          s = e.cancelEditNode,
          p = a.groups || [],
          d = a.id,
          m = {
            id: a.id,
            color: a.color,
            groups: l.filter(function(e) {
              return !!p.find(function(t) {
                return t.id === e.id;
              });
            }),
          },
          f = $a.object().shape({
            id: $a
              .string()
              .required('Required')
              .notOneOf(
                o.filter(function(e) {
                  return e !== a.id;
                })
              ),
            groups: $a.array(),
          });
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Edit node ', a.id),
          r.a.createElement(Va.c, {
            initialValues: m,
            validationSchema: f,
            onSubmit: function(e) {
              return u(d, e);
            },
            render: function(e) {
              var t = e.errors,
                n = e.values,
                a = e.setFieldValue;
              return r.a.createElement(
                Va.b,
                null,
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(Va.a, { type: 'text', label: 'ID', name: 'id', component: Ir, error: !!t.id }),
                  r.a.createElement(Sr, {
                    color: n.color,
                    colors: Lr,
                    onChange: function(e) {
                      return a('color', e);
                    },
                  }),
                  r.a.createElement(nr, {
                    groups: l,
                    selectedGroups: n.groups,
                    onChange: function(e) {
                      return a('groups', e);
                    },
                  })
                ),
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(_n.a, { onClick: s, className: 'cancel', type: 'button' }, 'Cancel'),
                  r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                )
              );
            },
          })
        );
      };
      var _r = Object(c.b)(
        function(e) {
          return { isOpen: jt(e, ft.EDIT_NODE), node: kt(e, ft.EDIT_NODE), nodesIds: ae(e), groups: le(e) };
        },
        function(e) {
          return {
            editNode: function(t, n) {
              e(
                (function(e, t) {
                  return { type: L, payload: { oldId: e, node: t } };
                })(t, n)
              ),
                e(vt(ft.EDIT_NODE));
            },
            cancelEditNode: function() {
              return e(vt(ft.EDIT_NODE));
            },
          };
        }
      )(Dr);
      function Tr() {
        var e = Object(Oa.a)(['\n  display: block !important;\n']);
        return (
          (Tr = function() {
            return e;
          }),
          e
        );
      }
      var Rr = Object(ja.a)(qa.a)(Tr());
      var Pr = function(e) {
        var t = e.isOpen,
          n = e.link,
          a = void 0 === n ? {} : n,
          c = e.groups,
          o = void 0 === c ? [] : c,
          i = e.editLink,
          l = e.cancelEditLink,
          u = a.groups || [],
          s = {
            label: a.label,
            groups: o.filter(function(e) {
              return !!u.find(function(t) {
                return t.id === e.id;
              });
            }),
          },
          p = $a.object().shape({ label: $a.string().required('Required'), groups: $a.array() });
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Edit link ', a.label),
          r.a.createElement(Va.c, {
            initialValues: s,
            validationSchema: p,
            onSubmit: function(e) {
              return i(Object(m.a)({}, a, e));
            },
            render: function(e) {
              var t = e.errors,
                n = e.values,
                a = e.setFieldValue;
              return r.a.createElement(
                Va.b,
                null,
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(Va.a, { type: 'text', label: 'Label', name: 'label', component: Rr, error: !!t.label }),
                  r.a.createElement(nr, {
                    groups: o,
                    selectedGroups: n.groups,
                    onChange: function(e) {
                      return a('groups', e);
                    },
                  })
                ),
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(_n.a, { onClick: l, className: 'cancel', type: 'button' }, 'Cancel'),
                  r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                )
              );
            },
          })
        );
      };
      var Ar = Object(c.b)(
        function(e) {
          return { isOpen: jt(e, ft.EDIT_LINK), link: kt(e, ft.EDIT_LINK), groups: le(e) };
        },
        function(e) {
          return {
            editLink: function(t) {
              e(
                (function(e) {
                  return { type: _, payload: e };
                })(t)
              ),
                e(vt(ft.EDIT_LINK));
            },
            cancelEditLink: function() {
              return e(vt(ft.EDIT_LINK));
            },
          };
        }
      )(Pr);
      var Fr = function(e) {
          var t = e.className;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(Ka, { className: t }),
            r.a.createElement(cr, null),
            r.a.createElement(Er, null),
            r.a.createElement(_r, null),
            r.a.createElement(Ar, null)
          );
        },
        Mr = n(324),
        Hr = n.n(Mr),
        Wr = n(345),
        Br = n(746),
        zr = n(171),
        Kr = n.n(zr),
        qr = n(169),
        Vr = n.n(qr),
        $r = n(170),
        Ur = n.n($r),
        Jr = n(325),
        Xr = n.n(Jr);
      var Yr = Object(Fn.a)(
        function(e) {
          return { moreButton: { marginRight: -e.spacing(2) } };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.graphName,
          n = e.openEditGraph,
          a = e.openConfirmDeleteGraph,
          c = e.openExport,
          o = e.showOnboarding,
          i = e.classes,
          l = Object(Mn.a)(e, ['graphName', 'openEditGraph', 'openConfirmDeleteGraph', 'openExport', 'showOnboarding', 'classes']),
          u = r.a.useState(null),
          s = Object(xe.a)(u, 2),
          p = s[0],
          d = s[1];
        function m() {
          d(null);
        }
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            Hn.a,
            Object.assign(
              {
                color: 'inherit',
                onClick: function(e) {
                  d(e.currentTarget);
                },
                className: i.moreButton,
              },
              l
            ),
            r.a.createElement(Hr.a, null)
          ),
          r.a.createElement(
            Wr.a,
            { anchorEl: p, open: !!p, onClose: m },
            r.a.createElement(
              Ya.a,
              {
                onClick: function() {
                  n(), m();
                },
              },
              r.a.createElement(Br.a, null, r.a.createElement(Vr.a, null)),
              'Edit'
            ),
            r.a.createElement(
              Ya.a,
              {
                onClick: function() {
                  c(), m();
                },
              },
              r.a.createElement(Br.a, null, r.a.createElement(Ur.a, null)),
              'Export'
            ),
            r.a.createElement(
              Ya.a,
              {
                onClick: function() {
                  a(t), m();
                },
              },
              r.a.createElement(Br.a, null, r.a.createElement(Kr.a, null)),
              'Delete'
            ),
            r.a.createElement(
              Ya.a,
              {
                onClick: function() {
                  o(), m();
                },
              },
              r.a.createElement(Br.a, null, r.a.createElement(Xr.a, null)),
              'Help'
            )
          )
        );
      });
      var Zr = Object(c.b)(
        function(e) {
          return { graphName: Z(e) };
        },
        function(e) {
          return {
            openConfirmDeleteGraph: function(t) {
              return e(Et(ft.CONFIRM_DELETE_GRAPH, t));
            },
            openEditGraph: function() {
              return e(Et(ft.EDIT_GRAPH));
            },
            openExport: function() {
              return e(Et(ft.EXPORT_GRAPH));
            },
            showOnboarding: function() {
              return e(En());
            },
          };
        }
      )(Yr);
      var Qr = function(e) {
        var t = e.isOpen,
          n = e.graphId,
          a = e.graphName,
          c = e.setGraphName,
          o = e.cancelEditGraph,
          i = { graphName: a },
          l = $a.object().shape({ graphName: $a.string().required('Required') });
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Edit graph ', a),
          r.a.createElement(Va.c, {
            initialValues: i,
            validationSchema: l,
            onSubmit: function(e) {
              return c(n, e.graphName);
            },
            render: function(e) {
              var t = e.errors;
              return r.a.createElement(
                Va.b,
                null,
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(Va.a, { type: 'text', label: 'Name', name: 'graphName', component: qa.a, error: !!t.name })
                ),
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(_n.a, { onClick: o, className: 'cancel', type: 'button' }, 'Cancel'),
                  r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                )
              );
            },
          })
        );
      };
      var ec = Object(c.b)(
          function(e) {
            return { isOpen: jt(e, ft.EDIT_GRAPH), graphName: Z(e), graphId: Y(e) };
          },
          function(e) {
            return {
              setGraphName: function(t, n) {
                e(vt(ft.EDIT_GRAPH)), e({ type: y, payload: { id: t, name: n } });
              },
              cancelEditGraph: function() {
                return e(vt(ft.EDIT_GRAPH));
              },
            };
          }
        )(Qr),
        tc = n(172),
        nc = n.n(tc);
      n(293), n(294);
      var ac = function(e) {
        var t = e.fileName,
          n = e.content;
        return r.a.createElement(
          _n.a,
          {
            onClick: function() {
              return (function(e, t) {
                var n = document.createElement('a');
                n.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(t)),
                  n.setAttribute('download', e),
                  (n.style.display = 'none'),
                  document.body.appendChild(n),
                  n.click(),
                  document.body.removeChild(n);
              })(t, n);
            },
          },
          'Download',
          r.a.createElement(Ur.a, null)
        );
      };
      var rc = function(e) {
        var t = e.isOpen,
          n = e.graphName,
          a = e.serializedGraph,
          c = e.close;
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, 'Export'),
          r.a.createElement(
            Dn.a,
            null,
            r.a.createElement(nc.a, {
              placeholder: '',
              mode: 'javascript',
              theme: 'monokai',
              fontSize: 14,
              showPrintMargin: !1,
              showGutter: !0,
              highlightActiveLine: !0,
              value: a,
              focus: !0,
              readOnly: !0,
              setOptions: { enableBasicAutocompletion: !1, enableLiveAutocompletion: !1, enableSnippets: !1, showLineNumbers: !0, tabSize: 2 },
            })
          ),
          r.a.createElement(
            Dn.a,
            null,
            r.a.createElement(ac, { fileName: ''.concat(n, '.json'), content: a }),
            r.a.createElement(_n.a, { color: 'primary', onClick: c }, 'Done')
          )
        );
      };
      var cc = Object(c.b)(
          function(e) {
            return { isOpen: jt(e, ft.EXPORT_GRAPH), serializedGraph: oe(e), graphName: Z(e) };
          },
          function(e) {
            return {
              close: function() {
                return e(vt(ft.EXPORT_GRAPH));
              },
            };
          }
        )(rc),
        oc = n(761),
        ic = n(748),
        lc = n(749),
        uc = n(329),
        sc = n.n(uc),
        pc = n(326),
        dc = n.n(pc);
      var mc = Object(Fn.a)(function(e) {
          return { figure: { textAlign: 'center', margin: 'auto' }, icon: { fontSize: '4rem' }, callToAction: { marginTop: e.spacing(1) } };
        })(function(e) {
          var t = e.classes,
            n = e.addGroup;
          return r.a.createElement(
            'figure',
            { className: t.figure },
            r.a.createElement(dc.a, { className: t.icon }),
            r.a.createElement('figcaption', null, r.a.createElement(An.a, { color: 'textPrimary' }, 'The are no groups')),
            r.a.createElement(_n.a, { onClick: n, variant: 'contained', color: 'primary', className: t.callToAction }, 'Add group')
          );
        }),
        fc = [vr.a.A700, Or.a.A700, jr.a.A700, kr.a.A700, yr.a.A700, Nr.a.A700, wr.a.A700, xr.a.A700],
        gc = $a.object().shape({ name: $a.string().required('Required'), color: $a.string().required('Required') }),
        hc = Object(Fn.a)({ root: { display: 'block' } })(qa.a);
      function bc(e) {
        var t = e.isOpen,
          n = e.group,
          a = void 0 === n ? {} : n,
          c = e.save,
          o = e.cancel,
          i = Object(m.a)({ name: '', color: fc[0] }, a),
          l = a.id ? 'Edit group '.concat(a.name) : 'New group';
        return r.a.createElement(
          Ln.a,
          { open: t },
          r.a.createElement(In.a, null, l),
          r.a.createElement(Va.c, {
            initialValues: i,
            validationSchema: gc,
            onSubmit: c,
            render: function(e) {
              var t = e.errors,
                n = e.values,
                a = e.setFieldValue;
              return r.a.createElement(
                Va.b,
                null,
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(Va.a, { type: 'text', label: 'Name', name: 'name', component: hc, error: !!t.name }),
                  r.a.createElement(Sr, {
                    color: n.color,
                    colors: fc,
                    onChange: function(e) {
                      return a('color', e);
                    },
                  })
                ),
                r.a.createElement(
                  Dn.a,
                  null,
                  r.a.createElement(_n.a, { onClick: o, className: 'cancel', type: 'button' }, 'Cancel'),
                  r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
                )
              );
            },
          })
        );
      }
      var Ec = n(747);
      var vc = Object(Fn.a)({ root: { borderRadius: '2px', width: '1rem', height: '1rem' } })(function(e) {
        var t = e.color,
          n = void 0 === t ? '#ccc' : t,
          a = e.classes;
        return r.a.createElement('div', { className: a.root, style: { backgroundColor: n } });
      });
      function Oc(e) {
        var t = e.group,
          n = e.onDelete,
          a = e.onEdit;
        return r.a.createElement(
          pa.a,
          null,
          r.a.createElement(Br.a, null, r.a.createElement(vc, { color: t.color })),
          r.a.createElement(da.a, { primary: t.name }),
          r.a.createElement(
            Ec.a,
            { edge: 'end' },
            r.a.createElement(
              Hn.a,
              {
                onClick: function() {
                  return a(t);
                },
              },
              r.a.createElement(Vr.a, null)
            ),
            r.a.createElement(
              Hn.a,
              {
                onClick: function() {
                  return n(t.id);
                },
              },
              r.a.createElement(Kr.a, null)
            )
          )
        );
      }
      var jc = n(327),
        kc = n.n(jc);
      function yc(e) {
        var t = e.onClick;
        return r.a.createElement(
          pa.a,
          { button: !0, onClick: t },
          r.a.createElement(Br.a, null, r.a.createElement(kc.a, null)),
          r.a.createElement(da.a, { primary: 'Add group' })
        );
      }
      function Nc(e) {
        var t = e.open,
          n = void 0 !== t && t,
          a = e.groupName,
          c = e.confirm,
          o = e.cancel;
        return r.a.createElement(
          Ln.a,
          { open: n },
          r.a.createElement(In.a, null, 'Do you want to delete ', a, '?'),
          r.a.createElement(Dn.a, null, r.a.createElement(ua.a, null, 'This action cannot be undone.')),
          r.a.createElement(
            Dn.a,
            null,
            r.a.createElement(_n.a, { onClick: o, className: 'cancel' }, 'Cancel'),
            r.a.createElement(_n.a, { onClick: c, color: 'primary' }, 'Delete')
          )
        );
      }
      var wc = Object(Fn.a)({
        root: { width: '100%', '&.Mui-expanded': { margin: 0 } },
        list: { width: '100%' },
        content: { maxHeight: '30vh', overflow: 'scroll' },
      })(function(e) {
        var t = e.groups,
          n = void 0 === t ? [] : t,
          c = e.classes,
          o = void 0 === c ? {} : c,
          i = e.addGroup,
          l = e.removeGroup,
          u = e.updateGroup,
          s = Object(a.useState)(!0),
          p = Object(xe.a)(s, 2),
          d = p[0],
          m = p[1],
          f = Object(a.useState)({ open: !1, group: void 0 }),
          g = Object(xe.a)(f, 2),
          h = g[0],
          b = g[1],
          E = Object(a.useState)({ open: !1, group: void 0 }),
          v = Object(xe.a)(E, 2),
          O = v[0],
          j = v[1],
          k =
            !!n.length &&
            n.map(function(e) {
              return r.a.createElement(Oc, {
                key: e.id,
                group: e,
                onDelete: function() {
                  return j({ open: !0, group: e });
                },
                onEdit: function() {
                  b({ open: !0, group: e });
                },
              });
            }),
          y =
            !!n.length &&
            r.a.createElement(
              sa.a,
              { className: o.list },
              k,
              r.a.createElement(yc, {
                onClick: function() {
                  return b({ open: !0, group: void 0 });
                },
              })
            ),
          N =
            !n.length &&
            r.a.createElement(mc, {
              addGroup: function() {
                return b({ open: !0, group: void 0 });
              },
            });
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            oc.a,
            {
              className: o.root,
              expanded: d,
              onChange: function() {
                return m(!d);
              },
            },
            r.a.createElement(ic.a, { expandIcon: r.a.createElement(sc.a, null) }, r.a.createElement(An.a, { color: 'textSecondary' }, 'Groups')),
            r.a.createElement(lc.a, { classes: { root: o.content } }, N, y)
          ),
          r.a.createElement(bc, {
            isOpen: h.open,
            group: h.group,
            cancel: function() {
              return b({ open: !1, group: void 0 });
            },
            save: function(e) {
              e.id ? u(e) : i(e), b({ open: !1, group: void 0 });
            },
          }),
          r.a.createElement(Nc, {
            open: O.open,
            groupName: O.group ? O.group.name : '',
            cancel: function() {
              return j({ open: !1, group: void 0 });
            },
            confirm: function() {
              l(O.group.id), j({ open: !1, group: void 0 });
            },
          })
        );
      });
      var xc = Object(c.b)(
          function(e) {
            return { groups: le(e) };
          },
          function(e) {
            return Object(s.b)({ addGroup: z, removeGroup: K, updateGroup: q }, e);
          }
        )(wc),
        Cc = n(330),
        Sc = n.n(Cc),
        Gc = n(10),
        Ic = { value: '' };
      var Lc = Object(Fn.a)(
        function(e) {
          return {
            container: { flexGrow: 1 },
            form: {
              flexGrow: 1,
              padding: e.spacing(1),
              margin: e.spacing(1),
              borderRadius: e.shape.borderRadius,
              '&:hover,&:focus,&:active': { backgroundColor: Object(Gc.c)(e.palette.primary.light, 0.15) },
            },
            fieldUnderline: { '&:before,&:after': { borderBottom: 'none !important' } },
            send: { padding: 0 },
          };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.processSubgraph,
          n = e.importSubgraph,
          a = e.error,
          c = void 0 !== a && a,
          o = e.processing,
          i = void 0 !== o && o,
          l = e.className,
          u = e.classes;
        return r.a.createElement(
          'div',
          { className: Object(zn.a)(u.container, l) },
          r.a.createElement(
            Rn.a,
            { position: 'static', color: 'default' },
            r.a.createElement(
              Pn.a,
              { variant: 'dense' },
              r.a.createElement(Va.c, {
                initialValues: Ic,
                onSubmit: function(e, t) {
                  var a = e.value,
                    r = t.resetForm,
                    o = t.setSubmitting;
                  c || (n(a), r(Ic)), o(!1);
                },
                render: function(e) {
                  var n = e.handleChange;
                  return r.a.createElement(
                    Va.b,
                    { className: u.form },
                    r.a.createElement(
                      la.a,
                      { display: 'flex' },
                      r.a.createElement(
                        la.a,
                        { flexGrow: 1 },
                        r.a.createElement(Va.a, {
                          type: 'text',
                          name: 'value',
                          component: qa.a,
                          InputProps: {
                            onChange: function(e) {
                              t(e.target.value), n(e);
                            },
                            error: c,
                            placeholder: 'Graph path',
                            margin: 'none',
                            classes: { underline: u.fieldUnderline },
                          },
                          margin: 'none',
                          fullWidth: !0,
                        })
                      ),
                      r.a.createElement(Hn.a, { type: 'submit', color: 'primary', disabled: i, className: u.send }, r.a.createElement(Sc.a, null))
                    )
                  );
                },
              })
            )
          )
        );
      });
      var Dc = Object(c.b)(
          function(e) {
            return { error: an(e), processing: ln(e) };
          },
          function(e) {
            return Object(s.b)({ processSubgraph: Qt, importSubgraph: tn }, e);
          }
        )(Lc),
        _c = n(765),
        Tc = n(337),
        Rc = n.n(Tc),
        Pc = n(336),
        Ac = n.n(Pc),
        Fc = n(331),
        Mc = n.n(Fc),
        Hc = Object(Fn.a)(
          function(e) {
            return { img: { maxWidth: '100%', marginTop: e.spacing(2), marginBottom: e.spacing(2) } };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.hidden,
            n = e.className,
            a = e.classes;
          return r.a.createElement(
            la.a,
            { hidden: t, className: n },
            r.a.createElement('p', null, "Grapher is a tool to create graphs. That's it!"),
            r.a.createElement(
              'p',
              null,
              'Start off by adding some nodes and link them to one another. Then, assign groups to them and color each group to reveal patterns in your graph.'
            ),
            r.a.createElement('img', { src: Mc.a, alt: 'Sample graph', className: a.img }),
            r.a.createElement(
              'p',
              null,
              'Your graphs will be stored in your browser. You can export them to JSON format and then import them in some other browser!'
            ),
            r.a.createElement('p', null, 'Want to learn more? Click the ', r.a.createElement('em', null, 'next button'), '.')
          );
        }),
        Wc = n(332),
        Bc = n.n(Wc),
        zc = Object(Fn.a)(
          function(e) {
            return { img: { maxWidth: '100%', marginTop: e.spacing(2), marginBottom: e.spacing(2) } };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.hidden,
            n = e.className,
            a = e.classes;
          return r.a.createElement(
            la.a,
            { hidden: t, className: n },
            r.a.createElement('p', null, 'Add nodes and links from the speed dial on the bottom right corner'),
            r.a.createElement(la.a, { textAlign: 'center' }, r.a.createElement('img', { src: Bc.a, alt: 'Sample graph', className: a.img })),
            r.a.createElement('p', null, 'Name nodes and assign them a color, if you wish.'),
            r.a.createElement('p', null, 'Then, you can start linking them together by adding links. Which can also be named and colored!')
          );
        }),
        Kc = n(333),
        qc = n.n(Kc),
        Vc = Object(Fn.a)(
          function(e) {
            return { img: { maxWidth: '100%', marginTop: e.spacing(2), marginBottom: e.spacing(2) } };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.hidden,
            n = e.className,
            a = e.classes;
          return r.a.createElement(
            la.a,
            { hidden: t, className: n },
            r.a.createElement('p', null, 'Assign groups to nodes and links to color them automatically.'),
            r.a.createElement('p', null, 'Reveal hidden patterns in your graph by grouping together nodes and links.'),
            r.a.createElement(la.a, { textAlign: 'center' }, r.a.createElement('img', { src: qc.a, alt: 'Sample graph', className: a.img })),
            r.a.createElement('p', null, 'Manage groups from the card at the bottom left corner')
          );
        }),
        $c = n(334),
        Uc = n.n($c),
        Jc = Object(Fn.a)(
          function(e) {
            return { img: { maxWidth: '100%', marginTop: e.spacing(2), marginBottom: e.spacing(2) } };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.hidden,
            n = e.className,
            a = e.classes;
          return r.a.createElement(
            la.a,
            { hidden: t, className: n },
            r.a.createElement('p', null, 'Become a power user by creating your graphs ', r.a.createElement('em', null, 'writing them down'), '!'),
            r.a.createElement('p', null, 'Use the text editor at the bottom bar to do so.'),
            r.a.createElement(la.a, { textAlign: 'center' }, r.a.createElement('img', { src: Uc.a, alt: 'Sample graph', className: a.img })),
            r.a.createElement('p', null, 'The syntax is quite simple. Surround your nodes in parentheses and use arrows to link them.'),
            r.a.createElement('pre', null, '(Frodo)->(Sam)'),
            r.a.createElement('p', null, 'Name your links too, if you wish.'),
            r.a.createElement('pre', null, '(Frodo)-[master of]->(Sam)'),
            r.a.createElement('p', null, 'And assign groups using colons!'),
            r.a.createElement('pre', null, '(Frodo:Hobbit:Ring bearer)-[master of:social relation]->(Sam)')
          );
        }),
        Xc = n(335),
        Yc = n.n(Xc),
        Zc = Object(Fn.a)(
          function(e) {
            return { closeButton: { position: 'absolute', right: e.spacing(1), top: e.spacing(1), color: e.palette.grey[500] } };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.children,
            n = e.onClose,
            a = e.classes;
          return r.a.createElement(
            In.a,
            { disableTypography: !0, className: a.root },
            r.a.createElement(An.a, { variant: 'h6' }, t),
            r.a.createElement(Hn.a, { 'aria-label': 'close', className: a.closeButton, onClick: n }, r.a.createElement(Yc.a, null))
          );
        }),
        Qc = Object(Fn.a)(
          function(e) {
            return {
              stepper: { width: '40vw', maxWidth: 600, margin: 'auto' },
              step: { width: '40vw', maxWidth: 600, height: '60vh', maxHeight: 600, overflow: 'scroll', padding: e.spacing(3) },
            };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.open,
            n = e.dismiss,
            c = e.classes,
            o = Object(a.useState)(0),
            i = Object(xe.a)(o, 2),
            l = i[0],
            u = i[1];
          return r.a.createElement(
            Ln.a,
            { open: t },
            r.a.createElement(Zc, { onClose: n }, 'Welcome to Grapher!'),
            r.a.createElement(Hc, { hidden: 0 !== l, className: c.step }),
            r.a.createElement(zc, { hidden: 1 !== l, className: c.step }),
            r.a.createElement(Vc, { hidden: 2 !== l, className: c.step }),
            r.a.createElement(Jc, { hidden: 3 !== l, className: c.step }),
            r.a.createElement(_c.a, {
              variant: 'dots',
              steps: 4,
              position: 'static',
              activeStep: l,
              className: c.stepper,
              nextButton: r.a.createElement(
                _n.a,
                {
                  size: 'small',
                  onClick: function() {
                    u(function(e) {
                      return e + 1;
                    });
                  },
                  disabled: 3 === l,
                },
                'Next',
                r.a.createElement(Ac.a, null)
              ),
              backButton: r.a.createElement(
                _n.a,
                {
                  size: 'small',
                  onClick: function() {
                    u(function(e) {
                      return e - 1;
                    });
                  },
                  disabled: 0 === l,
                },
                r.a.createElement(Rc.a, null),
                'Back'
              ),
            })
          );
        }),
        eo = Object(c.b)(
          function(e) {
            return { open: On(e) };
          },
          function(e) {
            return Object(s.b)({ dismiss: bn }, e);
          }
        )(Qc);
      var to = Object(Fn.a)(
        function(e) {
          return {
            canvas: { position: 'absolute', top: '64px', left: 0, width: '100%', height: 'calc(100vh - 128px)' },
            grid: { position: 'absolute', top: '64px', left: 0, width: '100%', height: 'calc(100vh - 128px)', pointerEvents: 'none' },
            leftPanel: { height: 'calc(100vh - 128px)', padding: e.spacing(2) },
            leftPanelContent: { overflow: 'scroll', pointerEvents: 'auto', width: '100%', maxHeight: '100%' },
            rightPanel: { padding: e.spacing(2), height: '100%', '& > *': { pointerEvents: 'auto' } },
            selectedItems: { width: '100%' },
            textEditor: { position: 'absolute', bottom: 0, left: 0, width: '100%' },
          };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.graphId,
          n = e.graphName,
          a = e.loadedGraphId,
          c = e.loadGraph,
          o = e.openGraphList,
          i = e.classes;
        return (
          t && t !== a && c(t),
          r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(qn, { title: n, onBack: o }, r.a.createElement(Zr, null)),
            r.a.createElement(va, null),
            r.a.createElement(ec, null),
            r.a.createElement(cc, null),
            r.a.createElement(eo, null),
            r.a.createElement(oa, { className: i.canvas }),
            r.a.createElement(
              ia.a,
              { container: !0, classes: { root: i.grid } },
              r.a.createElement(
                ia.a,
                { item: !0, lg: 3, xs: 4 },
                r.a.createElement(
                  la.a,
                  { display: 'flex', alignItems: 'flex-end', className: i.leftPanel },
                  r.a.createElement(
                    la.a,
                    { className: i.leftPanelContent },
                    r.a.createElement(_a, { className: i.selectedItems }),
                    r.a.createElement(xc, null)
                  )
                )
              ),
              r.a.createElement(ia.a, { item: !0, lg: 8, xs: 6 }),
              r.a.createElement(
                ia.a,
                { item: !0, lg: 1, xs: 2 },
                r.a.createElement(
                  la.a,
                  { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', className: i.rightPanel },
                  r.a.createElement(Fr, null)
                )
              )
            ),
            r.a.createElement(Dc, { className: i.textEditor })
          )
        );
      });
      var no = Object(l.c)(
          Object(c.b)(
            function(e, t) {
              return { graphId: t.match.params.graphId, loadedGraphId: Y(e), graphName: Z(e) };
            },
            function(e) {
              return Object(s.b)({ loadGraph: M, openGraphList: pt }, e);
            }
          )(to)
        ),
        ao = n(667),
        ro = n(338),
        co = n.n(ro),
        oo = n(339),
        io = n.n(oo),
        lo = n(752);
      var uo = function(e) {
        var t = e.graphNames,
          n = e.openNewGraph,
          a = e.openGraph,
          c = e.openImportGraph,
          o = t.map(function(e) {
            var t = Object(xe.a)(e, 2),
              n = t[0],
              c = t[1];
            return r.a.createElement(
              pa.a,
              {
                key: n,
                button: !0,
                onClick: function() {
                  return a(n);
                },
              },
              r.a.createElement(da.a, { primary: c })
            );
          }),
          i = r.a.createElement(
            pa.a,
            { button: !0, onClick: n, className: 'open-new-graph' },
            r.a.createElement(lo.a, null, r.a.createElement(ao.a, null, r.a.createElement(co.a, null))),
            r.a.createElement(da.a, { primary: 'Create new graph' })
          ),
          l = r.a.createElement(
            pa.a,
            { button: !0, onClick: c, className: 'open-import-graph' },
            r.a.createElement(lo.a, null, r.a.createElement(ao.a, null, r.a.createElement(io.a, null))),
            r.a.createElement(da.a, { primary: 'Import graph' })
          );
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(qn, { title: 'Graph list' }),
          r.a.createElement(
            Ln.a,
            { open: !0 },
            r.a.createElement(In.a, null, 'Select a graph'),
            r.a.createElement(Dn.a, null, r.a.createElement(sa.a, null, o, i, l))
          )
        );
      };
      var so = Object(c.b)(
          function(e) {
            return { graphNames: we(e) };
          },
          function(e) {
            return Object(s.b)({ openNewGraph: ut, openGraph: st, openImportGraph: lt }, e);
          }
        )(uo),
        po = n(344);
      n(668);
      var mo = Object(Fn.a)(function(e) {
        return { listItem: { paddingLeft: 0 }, listItemText: { color: ''.concat(e.palette.error.main) } };
      })(function(e) {
        var t = e.errors,
          n = void 0 === t ? [] : t,
          c = e.close,
          o = e.importGraph,
          i = e.openGraphList,
          l = e.classes,
          u = Object(a.useState)(''),
          s = Object(xe.a)(u, 2),
          p = s[0],
          d = s[1],
          m = n.map(function(e, t) {
            return r.a.createElement(
              pa.a,
              { key: t, classes: { root: l.listItem } },
              r.a.createElement(da.a, { classes: { primary: l.listItemText }, primary: e })
            );
          });
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(qn, { title: 'Import', onBack: i }),
          r.a.createElement(
            Ln.a,
            { open: !0 },
            r.a.createElement(
              'form',
              {
                onSubmit: function(e) {
                  e.preventDefault(), o(p);
                },
              },
              r.a.createElement(In.a, null, 'Import'),
              r.a.createElement(
                Dn.a,
                null,
                r.a.createElement(sa.a, { dense: !0 }, m),
                r.a.createElement(po.a, {
                  onChange: function(e) {
                    return (function(e, t) {
                      var n = new FileReader();
                      (n.onload = function(e) {
                        var n = e.target.result;
                        t(n);
                      }),
                        n.readAsText(e);
                    })(e[0], d);
                  },
                  dropZoneClass: 'dropzone',
                  dropzoneParagraphClass: 'dropzone__paragraph',
                  dropzoneText: 'Drag and drop a JSON graph here or click to manually browse for it',
                  acceptedFiles: ['application/json'],
                  filesLimit: 1,
                  showPreviewsInDropzone: !1,
                  showAlerts: !1,
                }),
                r.a.createElement(nc.a, {
                  placeholder: '',
                  mode: 'javascript',
                  theme: 'monokai',
                  fontSize: 12,
                  showPrintMargin: !1,
                  showGutter: !0,
                  highlightActiveLine: !0,
                  value: p,
                  focus: !0,
                  onChange: function(e) {
                    return d(e);
                  },
                  setOptions: { showLineNumbers: !0, tabSize: 2 },
                })
              ),
              r.a.createElement(
                Dn.a,
                null,
                r.a.createElement(_n.a, { onClick: c, type: 'button' }, 'Cancel'),
                r.a.createElement(_n.a, { color: 'primary', type: 'submit' }, 'Done')
              )
            )
          )
        );
      });
      var fo = Object(c.b)(
          function(e) {
            return { errors: Qe(e) };
          },
          function(e) {
            return Object(m.a)({}, Object(s.b)({ importGraph: Xe, openGraphList: pt }, e), {
              close: function() {
                return e(pt());
              },
            });
          }
        )(mo),
        go = (function(e) {
          function t() {
            return Object(b.a)(this, t), Object(Cn.a)(this, Object(Sn.a)(t).apply(this, arguments));
          }
          return (
            Object(Gn.a)(t, e),
            Object(E.a)(t, [
              {
                key: 'render',
                value: function() {
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(l.a, {
                      path: [Se.BASE, Se.GRAPHS],
                      exact: !0,
                      render: function() {
                        return [r.a.createElement(so, { key: 'GraphList' }), r.a.createElement(oa, { key: 'Canvas' })];
                      },
                    }),
                    r.a.createElement(l.a, {
                      path: Se.IMPORT_GRAPH,
                      exact: !0,
                      render: function() {
                        return [r.a.createElement(fo, { key: 'Import' }), r.a.createElement(oa, { key: 'Canvas' })];
                      },
                    }),
                    r.a.createElement(l.a, {
                      path: Se.NEW_GRAPH,
                      exact: !0,
                      render: function() {
                        return [r.a.createElement(Vn, { key: 'NewGraph' }), r.a.createElement(oa, { key: 'Canvas' })];
                      },
                    }),
                    r.a.createElement(l.a, {
                      path: Se.GRAPH,
                      exact: !0,
                      render: function() {
                        return r.a.createElement(no, { key: 'Graph' });
                      },
                    })
                  );
                },
              },
            ]),
            t
          );
        })(a.Component);
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      );
      n(669);
      i.a.render(
        r.a.createElement(c.a, { store: xn }, r.a.createElement(l.b, { history: ze }, r.a.createElement(u.a, null), r.a.createElement(go, null))),
        document.getElementById('root')
      ),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    },
  },
  [[366, 1, 2]],
]);
//# sourceMappingURL=main.a1671ee5.chunk.js.map
