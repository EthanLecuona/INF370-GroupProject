using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Booking_Type")]
    public partial class BookingType
    {
        public BookingType()
        {
            Bookings = new HashSet<Booking>();
        }

        [Key]
        [Column("BookingType_ID")]
        public int BookingTypeId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; }

        [InverseProperty("BookingType")]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
