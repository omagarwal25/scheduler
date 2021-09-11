export class GraphService {
  AdjList: any;
  noOfVertices: number;

  constructor(noOfVertices: number) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex(v: string) {
    this.AdjList.set(v, []);
  }

  addEdge(v: string, u: string, w: number) {
    // add logic to deal with case where edge already exists, and to take lower weighting
    this.AdjList.get(v).push({ node: u, weight: w });
  }

  topologicalSortUtil(
    v: string,
    visited: Record<string, unknown>,
    stack: string[],
  ) {
    visited[v] = true;

    const get_keys = this.AdjList.keys();

    let vInGetKeys = false;

    for (const i of get_keys) {
      if (v === i) {
        vInGetKeys = true;
        break;
      }
    }

    if (vInGetKeys === true) {
      for (const i of this.AdjList.get(v)) {
        if (visited[i.node] === false) {
          this.topologicalSortUtil(i.node, visited, stack);
        }
      }
    }

    stack.push(v);
  }

  shortestPath(s: string) {
    const visited = {};
    const stack: string[] = [];
    const dist = {};

    for (const i of this.AdjList.keys()) {
      visited[i] = false;
    }

    for (const i of this.AdjList.keys()) {
      if (visited[i] === false) {
        this.topologicalSortUtil(s, visited, stack);
      }
    }

    for (const i of this.AdjList.keys()) {
      dist[i] = Infinity;
    }

    dist[s] = 0;

    while (stack.length > 0) {
      const i = stack.pop();

      this.AdjList.get(i).forEach(
        ({ node, weight }) =>
          (dist[node] = Math.min(dist[i] + weight, dist[node])),
      );
    }

    const result: Path[] = [];

    for (const i of this.AdjList.keys()) {
      if (dist[i] !== Infinity) {
        result.push({ course: i, distance: dist[i] });
      }
    }

    return result;
  }

  printGraph() {
    // get all the vertices
    const get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (const i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      const get_values = this.AdjList.get(i);
      let conc = '';

      // iterate over the adjacency list
      // concatenate the values into a string
      for (const j of get_values) conc += j + ' ';

      // print the vertex and its adjacency list
      console.log(i + ' -> ' + conc);
    }
  }
}
