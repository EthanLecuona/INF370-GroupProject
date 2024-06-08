using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Event_Booking")]
    public partial class EventBooking
    {
        [Key]
        [Column("Event_Booking")]
        public int EventBooking1 { get; set; }
        [Column("Event_ID")]
        public int EventId { get; set; }
        [Column("Booking_ID")]
        public int BookingId { get; set; }

        [ForeignKey("BookingId")]
        [InverseProperty("EventBookings")]
        public virtual Booking Booking { get; set; } 
        [ForeignKey("EventId")]
        [InverseProperty("EventBookings")]
        public virtual Event Event { get; set; } 
    }
}
