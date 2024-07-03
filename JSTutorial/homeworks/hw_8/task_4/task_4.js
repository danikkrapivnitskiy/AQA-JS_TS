/*
Task 3:

2.  Вам необходимо команду айтишников для проекта!
    Вам нужно создать класс Team, структура представлена ниже.
    Вы должны реализовать следующие методы:
      get/set team's name
      get/set team’s sprint duration (number of weeks)
      get planned release date
      get/set daily standup time
      get number of teammates
      add/remove/edit teammate
      add/remove/edit tasks (таски могут храниться только уникальные)
      show all teammates
      show teammates by specialication
      show all tasks

    Создайте класс ITSpecialist. Реализуйте следующие методы:
      get all info
      set country
      get salary
    Создайте дочерние классы для некоторых айтишников.
    Реализовать возможность задавать свойства дочерних классов.
    Каждый класс должен находиться в своем собственном файле.
    Все данные из обьекта класса Team вывести в HTML

    Структура:

    class Team
    name
    sprint_duration
    release_date
    daily_standup_time
    teammates: []
    tasks: [],

    class ITSpecialist
    name
    grade
    experience_in_years
    age
    country
    _salary

    class Manager
    isScrumMaster

    class QA
    isAqa

    class Developer
    isWritingUnitTests

    class Task
    featureName
    userStoryNumber
    estimations
 */