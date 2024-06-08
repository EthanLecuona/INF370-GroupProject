using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Booking_Status")]
    public partial class BookingStatus
    {
        public BookingStatus()
        {
            Bookings = new HashSet<Booking>();
        }

        [Key]
        [Column("BookingStatus_ID")]
        public int BookingStatusId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Status { get; set; }

        [InverseProperty("BookingStatus")]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
