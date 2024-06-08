using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Event")]
    public partial class Event
    {
        public Event()
        {
            EventBookings = new HashSet<EventBooking>();
        }

        [Key]
        [Column("Event_ID")]
        public int EventId { get; set; }
        [StringLength(200)]
        [Unicode(false)]
        public string Description { get; set; } 
        public int NumberOfEmployees { get; set; }
        [StringLength(100)]
        [Unicode(false)]
        public string Location { get; set; }

        public DateTime EventDate { get; set; }

        [InverseProperty("Event")]
        public virtual ICollection<EventBooking> EventBookings { get; set; }
    }
}
