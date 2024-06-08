using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Comment")]
    public partial class Comment
    {
        [Key]
        [Column("Comment_ID")]
        public int CommentId { get; set; }
        [Column("Comment")]
        [StringLength(250)]
        [Unicode(false)]
        public string Comment1 { get; set; } 
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        [Column("Booking_ID")]
        public int BookingId { get; set; }
        [Column("SenderUser_ID")]
        [Unicode(false)]
        public string SenderUserId { get; set; } 

        [ForeignKey("BookingId")]
        [InverseProperty("Comments")]
        public virtual Booking Booking { get; set; } 
    }
}
