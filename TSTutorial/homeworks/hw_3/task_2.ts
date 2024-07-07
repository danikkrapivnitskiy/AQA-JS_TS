/**
 * 
 * Создайте дженерик класс Storage<T>, где T должен быть ограничен объектом, имеющим КАК МИНИМУМ {id: number}.
Задача класса - хранить объекты типа Т в приватном массиве
Реализуйте в классе следующие методы:
  - constructor должен принимать необзятельный массив объектов соответствующего типа. 
    Если массив пришел - объекты запушить в хранилище.
  - add, принимающий либо объект типа Т, либо объект типа Т без id. Метод должен быть реализовать с помощью ПЕРЕГРУЗКИ.
    Если на вход подан объект без айди - айди надо сгенерировать, затем запушить обьект в хранилище
    Если на вход подан объект с айди - запушить его в хранилище
    Для типизации используйте Utility Types
  - update, принимающий объект с айди и любым набором остальных ключей из типа Т. 
  - remove, принимающий на вход id и удаляющий объект из массива
  - getById(id), возвращающий объект по айди если найден
  - getAll(), возвращает все объекты в хранилище

 */
  class StorageClass<T extends { id: number }> {
    private storage: T[] = [];
    constructor(storage?: T[]) {
        if (storage) this.storage = storage.map(item => item as T);
    }
    add(item: T): this;
    add(item: Omit<T, "id">): this;
    add(item: Omit<T, "id"> | T): this {
        if ("id" in item) 
            this.storage.push(item as T) 
        else {
            const entity = {id : this.generateId(), ...item} as T;
            this.storage.push(entity);
        }
        return this;
    }

    update(id: number, item: Partial<T>) {
      const index = this.storage.findIndex(entity => entity.id === id);
      if (index !== -1) {
        this.storage[index] = { ...this.storage[index], ...item };
      }
    }

    remove(id: number) {
        this.storage = this.storage.filter(item => item.id!== id);
    }

    private getById(id: number): T {
        const object = this.storage.find(item => item.id === id);
        if (!object) throw new Error(`Could not find`);
        return object;
    }

    getAll(): Array<T> {
        return this.storage;
    }

    private generateId(): number {
        return this.storage.length === 0? 1 : this.storage.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    }

  }

  interface Generic {
    id: number;
  }

  type ExtendedGeneric = Generic & { [key: string]: any };

  const ObjectWithId: ExtendedGeneric = {
    id: 1,
    name: "JSon",
    surname: "JSov",
  }

  const ObjectWithoudId = {
    name: "TS",
    surname: "TSov",
  }

  const storage = new StorageClass<ExtendedGeneric>([ObjectWithId]);
  storage.add(ObjectWithoudId);
  console.log(storage.getAll()); // { id: 1, name: 'JSon', surname: 'TSov' }
  storage.update(1, {id: 1, surname: "JSov Updated"});
  console.log(storage.getAll());
  storage.remove(1);
  console.log(storage.getAll()); 


