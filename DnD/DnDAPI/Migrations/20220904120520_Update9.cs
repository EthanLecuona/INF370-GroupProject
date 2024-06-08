using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDApi.Migrations
{
    public partial class Update9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TyrePressure",
                table: "Fuel_Price",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TyrePressure",
                table: "Fuel_Price");
        }
    }
}
