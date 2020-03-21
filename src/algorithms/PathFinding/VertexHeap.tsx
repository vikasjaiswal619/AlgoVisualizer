import Heap from "./Heap"
import { Vertex } from "./Graph";

export default class VertexHeap extends Heap<Vertex<number>> {
    public compare(arg1: Vertex<number>, arg2: Vertex<number>): number {
        if (arg1.distance === arg2.distance) return (0);
        if (arg1.distance > arg2.distance) return (1);
        return (-1);
    }
}