using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.ViewModels;
using DnDApi.Database;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CommentController : ControllerBase
  {
    private readonly AppDbContext _appContext;
    public CommentController(AppDbContext appContext) {
      _appContext = appContext;
    }

    [HttpGet]
    [Route("GetComments")]
    public async Task<ActionResult<object>> GetComments(int bookingId)
    {
      try
      {
        return await _appContext.Comment.Where(c => c.BookingId == bookingId).ToListAsync();
        
      }
      catch (Exception)
      {
        return BadRequest();
      }
    }

    [HttpDelete]
    [Route("DeleteComment")]
    public async Task<ActionResult> DeleteComment(int com)
    {
      try
      {
        IQueryable<Comment> query = _appContext.Comment.Where(c => c.CommentId == com);
        _appContext.Remove(await query.FirstOrDefaultAsync());
        await _appContext.SaveChangesAsync();
        return Ok("Comment delete successfully!");
      }
      catch (Exception)
      {
        return BadRequest("Contact support! Comment services are not working!");
      }
    }

    [HttpPost]
    [Route("AddComment")]
    public async Task<ActionResult> AddComment(CommentView com)
    {
      try
      {
        var comment = new Comment
        {
          Comment1 = com.comment,
          SenderUserId = com.sender_Id,
          Date = com.date,
          BookingId = com.booking_Id
        };
        _appContext.Comment.Add(comment);
        await _appContext.SaveChangesAsync();
        return Ok("Comment successfully added!");
      }
      catch (Exception)
      {
        return BadRequest();
      }
    }

  }
}
