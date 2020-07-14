

object test {
  def main(args: Array[String]): Unit = {
    var root = T_Node(1)
    root.left = T_Node(3)
    root.right = T_Node(6)
    root.left.left = T_Node(2)
    root.left.right = T_Node(4)
    root.right.left = T_Node(5)
    root.right.right = T_Node(7)

    levelTrans(0, root :: Nil)
  }

  @scala.annotation.tailrec
  def levelTrans(depth: Int, in: List[T_Node]): Unit = in match {
    case Nil =>
    case _ =>
      println(in.map(_.value).mkString(","))
      val list = (for (i <- in) yield i.left :: i.right :: Nil)
        .flatten
        .filter(_ != null)
      levelTrans(depth + 1, list)
  }

  case class T_Node(value: Int, var left: T_Node = null, var right: T_Node = null)

  def q1(n: Int): BigInt = {
    @scala.annotation.tailrec
    def q1_aux(n: Int, a: BigInt, b: BigInt): BigInt = n match {
      case 0 => a
      case 1 => b
      case _ => q1_aux(n - 1, b, a + b)
    }

    q1_aux(n, 0, 1)
  }

  def dice(step: Int): BigInt = {
    @scala.annotation.tailrec
    def dice_aux(step: Int, n1: BigInt, n2: BigInt, n3: BigInt, n4: BigInt, n5: BigInt, n6: BigInt): BigInt = step match {
      case 0 => n1
      case _ => dice_aux(step - 1, n2, n3, n4, n5, n6, n1 + n2 + n3 + n4 + n5 + n6)
    }

    dice_aux(step, 0, 1, 2, 4, 7, 16)
  }

  def time[R](block: => R): R = {
    val t0 = System.nanoTime()
    val result = block // call-by-name
    val t1 = System.nanoTime()
    println("Elapsed time: " + (t1 - t0) + "ns")
    result
  }
}
