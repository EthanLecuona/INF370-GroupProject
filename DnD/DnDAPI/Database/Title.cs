using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Title")]
    public partial class Title
    {
        [Key]
        [Column("Title_ID")]
        public int TitleId { get; set; }
        [Column("Title")]
        [StringLength(50)]
        [Unicode(false)]
        public string Title1 { get; set; }
    }
}
