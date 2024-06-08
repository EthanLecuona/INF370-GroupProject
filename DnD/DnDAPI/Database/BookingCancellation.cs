using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Booking_Cancellation")]
    public partial class BookingCancellation
    {
        [Key]
        [Column("BookingCancel_ID")]
        public int BookingCancelId { get; set; }
        [Column("Booking_ID")]
        public int BookingId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CancelledDate { get; set; }
        [StringLength(200)]
        [Unicode(false)]
        public string CancelledDescription { get; set; } 

        [ForeignKey("BookingId")]
        [InverseProperty("BookingCancellations")]
        public virtual Booking Booking { get; set; } 
    }
}
