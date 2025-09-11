using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class projetoTaskManagerController : ControllerBase
{
    private static readonly List<Tarefas> _todos = new List<Tarefas> {};

    private static int _nextId = 0;

    [HttpGet]
    public ActionResult<IEnumerable<Tarefas>> GetAll()
    {
        return _todos;
    }

    [HttpGet("{id}")]
    public ActionResult<Tarefas> GetById(int id)
    {
        var todo = _todos.Find(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        return todo;
    }

    // POST: api/todo
    [HttpPost]
    public ActionResult<Tarefas> Create(Tarefas item)
    {
        item.Id = _nextId++;
        _todos.Add(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    // PUT: api/todo/5
    [HttpPut("{id}")]
    public IActionResult Update(int id, Tarefas item)
    {
        if (id != item.Id)
        {
            return BadRequest();
        }
        var existingTodo = _todos.Find(t => t.Id == id);
        if (existingTodo == null)
        {
            return NotFound();
        }
        existingTodo.Title = item.Title;
        existingTodo.IsCompleted = item.IsCompleted;
        return NoContent();
    }

    // DELETE: api/todo/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var todo = _todos.Find(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        _todos.Remove(todo);
        return NoContent();
    }
}