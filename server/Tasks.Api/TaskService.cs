namespace Tasks.Api
{
    public class TaskService
    {
    }

    public class Task
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateOnly Date { get; set; }
    }
}
