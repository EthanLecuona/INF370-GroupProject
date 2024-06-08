using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Client_Employee_Connection")]
    public partial class ClientEmployeeConnection
    {
        public ClientEmployeeConnection()
        {
            Bookings = new HashSet<Booking>();
        }

        [Key]
        [Column("CEC_ID")]
        public int CecId { get; set; }
        [Column("ClientUser_ID")]
        [Unicode(false)]
        public string ClientUserId { get; set; } 
        [Column("User_ID")]
        [Unicode(false)]
        public string UserId { get; set; } 

        [InverseProperty("Cec")]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
