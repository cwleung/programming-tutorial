import org.apache.spark.SparkConf
import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._

object raw{
def main(args: Array[String]){
// Create a Scala Spark Context.
val conf = new SparkConf().setAppName("wordCount").setMaster("local[1]")
val sc = new SparkContext(conf)
// Load our input data.
val input = sc.textFile("raw.txt")
// Split it up into words.
val words = input.flatMap(line => line.split(" "))
// Transform into pairs and count.
val counts = words.map(word => (word, 1)).reduceByKey{case (x, y) => x + y}
// Save the word count back out to a text file, causing evaluation.
counts.foreach(println)
}
}
