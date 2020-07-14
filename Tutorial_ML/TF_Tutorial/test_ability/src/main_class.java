import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class main_class {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 2; i < 1000; i += 3)
            System.out.printf("%d\t%d\n", i, sum += i);
        new Cat().walk();
        new Dog().walk();


        System.out.println(Search(a));
    }

    static void Collection_Util() {
        List list = createList();

        print( + String.valueOf(Collections.binarySearch(list, 33)));
    }

    static List createList() {
        List a = new ArrayList<Integer>(100);
        for (int i = 0; i < 100; ++i) {
            a.add(i);
        }
        return a;
    }

    static void print(String s) {
        System.out.println(s);
    }

    static int Search(List<Integer> list) {
        int half = (list.size() / 2) + 1;
        if (half == 0) return 0;
        if (list.get(half) == 1)
            return list.get(half);
        return Search(list.subList(1, half)) + Search(list.subList(half + 1, list.size()));
    }
}

abstract class Animal {
    Animal() {
    }

    abstract void walk();
}

class Dog extends Animal {
    public Dog() {
    }

    @Override
    void walk() {
        System.out.println("Dog Bark");
    }
}

class Cat extends Animal {
    public Cat() {
    }

    @Override
    void walk() {
        System.out.println("Cat Meow");
    }
}
