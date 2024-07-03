/**
 * Task 2. Перед вами структура компани, и ниже представлены задания, относящиеся к ней.
 * В заданиях по максимуму использовать методы массивов, создавать функции-помощники, выполняющие дополнительные действия,
 * чтобы ваши функции выполняли строго одну работу. ЭТО ОЧЕНЬ ВАЖНО!
 *
 * const enterprises = [
 *   {
 *     id: 1,
 *     name: "Предприятие 1",
 *     departments: [
 *       {
 *         id: 2,
 *         name: "Отдел тестирования",
 *         employees_count: 10,
 *       },
 *       {
 *         id: 3,
 *         name: "Отдел маркетинга",
 *         employees_count: 20,
 *       },
 *       {
 *         id: 4,
 *         name: "Администрация",
 *         employees_count: 15,
 *       },
 *     ]
 *   },
 *   {
 *     id: 5,
 *     name: "Предприятие 2",
 *     departments: [
 *       {
 *         id: 6,
 *         name: "Отдел разработки",
 *         employees_count: 50,
 *       },
 *       {
 *         id: 7,
 *         name: "Отдел маркетинга",
 *         employees_count: 20,
 *       },
 *       {
 *         id: 8,
 *         name: "Отдел охраны труда",
 *         employees_count: 5,
 *       },
 *     ]
 *   },
 *   {
 *     id: 9,
 *     name: "Предприятие 3",
 *     departments: [
 *       {
 *         id: 10,
 *         name: "Отдел аналитики",
 *         employees_count: 0,
 *       },
 *     ]
 *   }
 * ]
 *
 * Задания:
 * 1. Вывести все предприятия и их отделы. Рядом указать количество сотрудников. Для предприятия посчитать сумму всех сотрудников во всех отделах.
 *
 * **Пример:**
 *
 * Предприятие 1 (45 сотрудников)
 * - Отдел тестирования (10 сотрудников)
 * - Отдел маркетинга (20 сотрудников)
 * - Администрация (15 человек)
 * Предприятие 2 (75 сотрудников)
 * - Отдел разработки (50 сотрудников)
 * - Отдел маркетинга (20 сотрудников)
 * - Отдел охраны труда (5 сотрудников)
 * Предприятие 3 (нет сотрудников)
 * - Отдел аналитики (нет сотрудников)
 *
 * 2. Написать функцию, которая будет принимать 1 аргумент (id отдела или название отдела и возвращать название предприятия, к которому относится).
 *
 * Пример:
 * getEnterpriseName(4) // Предприятие 1
 * getEnterpriseName("Отдел маркетинга") // Предприятие 2
 *
 * 3. Написать функцию, которая будет добавлять предприятие. В качестве аргумента принимает название предприятия
 *
 * Пример:
 * addEnterprise("Название нового предприятия")
 *
 * 4. Написать функцию, которая будет добавлять отдел в предприятие. В качестве аргумента принимает id предприятия, в которое будет добавлен отдел и название отдела.
 *
 * Пример:
 * addDepartment(1, "Название нового отдела")
 *
 * 5. Написать функцию для редактирования названия предприятия. Принимает в качестве аргумента id предприятия и новое имя предприятия.
 *
 * Пример:
 * editEnterprise(1, "Новое название предприятия")
 *
 *
 * 6. Написать функцию для редактирования названия отдела. Принимает в качестве аргумента id отдела и новое имя отдела.
 *
 * Пример:
 * editDepartment(7, "Новое название отдела")
 *
 *
 * 7. Написать функцию для удаления предприятия. В качестве аргумента принимает id предприятия.
 *
 * Пример:
 * deleteEnterprise(1)
 *
 *
 * 8. Написать функцию для удаления отдела. В качестве аргумента принимает id отдела. Удалить отдел можно только, если в нем нет сотрудников.
 *
 * Пример:
 * deleteDepartment(3)
 *
 *
 * 9. Написать функцию для переноса сотрудников между отделами одного предприятия. В качестве аргумента принимает два значения: id отдела, из которого будут переноситься сотрудники и id отдела, в который будут переноситься сотрудники).
 *
 * Пример:
 * moveEmployees(2, 3)
 */
const enterprises = [
    {
        id: 1,
        name: "Предприятие 1",
        departments: [
            {
                id: 2,
                name: "Отдел тестирования",
                employees_count: 10,
            },
            {
                id: 3,
                name: "Отдел маркетинга",
                employees_count: 20,
            },
            {
                id: 4,
                name: "Администрация",
                employees_count: 15,
            },
        ]
    },
    {
        id: 5,
        name: "Предприятие 2",
        departments: [
            {
                id: 6,
                name: "Отдел разработки",
                employees_count: 50,
            },
            {
                id: 7,
                name: "Отдел маркетинга",
                employees_count: 20,
            },
            {
                id: 8,
                name: "Отдел охраны труда",
                employees_count: 5,
            },
        ]
    },
    {
        id: 9,
        name: "Предприятие 3",
        departments: [
            {
                id: 10,
                name: "Отдел аналитики",
                employees_count: 0,
            },
        ]
    }
]

//1
function countEmployees(departments) {
    return departments.reduce((total, department) => total + department.employees_count, 0);
}
const getCommonInfo = (company) => {
    company.forEach(enterprise => {
            console.log(`${enterprise.name} (${countEmployees(enterprise.departments)} сотрудников)`);
          if (enterprise.departments) 
            enterprise.departments.forEach(department => console.log(`- ${department.name} (${department.employees_count})`));
    })
}
getCommonInfo(enterprises);

//2
function getFactoryByNameORId(key) {
    let foundEnterprise = null;
    enterprises.forEach(enterprise => {
        const foundDept = enterprise.departments.find(department =>
            department.id === key || department.name === key)
        if(foundDept) foundEnterprise = enterprise
    })

    if(!foundEnterprise) throw new Error()
    return foundEnterprise

}
console.log(getFactoryByNameORId("Отдел тестирования"))
console.log(getFactoryByNameORId(6))

//3
function addEnterprise(name) {
    const nejObj = {
        name,
        departments: [],
        id : enterprises.length - 1,
    }
    enterprises.push(nejObj);
}

addEnterprise("Предприятие 4")
console.log(enterprises);

//4
function getEnterpriseByIdOrName(key, company) {
    let enterpriseObj = null;
    company.forEach(enterprise => {
        if (enterprise.id === key || enterprise.name === key) enterpriseObj = enterprise
    })
    return enterpriseObj;
}
function findNextEnterpriseId() {
    const ids = enterprises.reduce((res, el) => {
        res.push(el.id);
        if (el.departments) res.push(...el.departments.map((el) => el.id));
        return res;
    }, []);
    return Math.max(...ids) + 1;
}
function addDepartment(id, name) {
    const enterprise = getEnterpriseByIdOrName(id, enterprises);
    const nejObj = {
        name,
        employees_count: [],
        id : findNextEnterpriseId(),
    }
    enterprise.departments.push(nejObj);
}
addDepartment(2, "Новый отдел");
console.log(enterprises[3])

//5
function editEnterpriseName(id, name, company) {
    const enterprise = getEnterpriseByIdOrName(id, company);
    enterprise.name = name;
}
editEnterpriseName(2, "Измененное предприятие", enterprises)
console.log(enterprises[3])

//6
function deleteEnterprise(id) {
    const index = enterprises.findIndex(enterprise => enterprise.id === id);
    if (index !== -1) {
        enterprises.splice(index, 1);
    }
}

deleteEnterprise(2)
console.log(enterprises)

//7
function getDepartmentIndexById(id) {
    let department = enterprises.map(enterprise => enterprise.departments.find(department => department.id === id))
    return department.filter(value => value !== undefined);
}
function deleteDepartment(id) {
    let index;
    enterprises.forEach(enterprise => {
        index = enterprise.departments.findIndex(department => department.id === id && department.employees_count !== 0)
        if (index !== -1) {
            enterprise.departments.splice(index, 1);
        }
    });
}
delete deleteDepartment(4);
console.log(enterprises[0])

//9
function findEmployeeByDepartmentIdAndSetNewValue(id, setValue) {
    let count;
    enterprises.forEach(enterprise => {
        enterprise.departments.map(department => {
            if (department.id === id) {
                count = department.employees_count;
                if (setValue === 0) {
                    department.employees_count = setValue;
                } else department.employees_count += setValue;
            }
        })
    });
    return count;
}

function moveEmployees(idFrom, idTo) {
    findEmployeeByDepartmentIdAndSetNewValue(idTo, findEmployeeByDepartmentIdAndSetNewValue(idFrom, 0));
}
moveEmployees(2,3);
console.log(enterprises[0])

