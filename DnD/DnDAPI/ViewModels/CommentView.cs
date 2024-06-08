using System;

namespace DnDApi.ViewModels
{
  public class CommentView
  {
    public string comment { get; set; }
    public DateTime date { get; set; }
    public string sender_Id { get; set; }
    public int booking_Id { get; set; }
  }
}
