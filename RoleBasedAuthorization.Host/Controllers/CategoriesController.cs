using RoleBasedAuthorization.Core.Categories;
using RoleBasedAuthorization.EFCore;
using RoleBasedAuthorization.Host.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly AppDbContext _context;
        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin, Manager")]
        [HttpGet("api/categories/getAll")]
        public ActionResult<PagedResultDto<Category>> GetAll(CategoriesGetAllInput input)
        {
            var categories = _context.Categories.Where(u=>u.IsDeleted != true);
            var filteredCategories = _context.Categories.AsEnumerable()
                .Where(category => 
                    string.IsNullOrEmpty(input.Filter) || 
                    category.Name.Contains(input.Filter, StringComparison.OrdinalIgnoreCase) || 
                    (!string.IsNullOrEmpty(category.Metadata) && category.Metadata.Split(',').Contains(input.Filter)))
                .Skip(input.Skip ?? 0)
                .Take(input.Take ?? int.MaxValue)
                .ToList();

            return Ok(new PagedResultDto<Category>() { Data = filteredCategories, Total = categories.Count() });
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpGet("api/categories/getCategoryForEdit")]
        public ActionResult<Category> GetCategoryForEdit(int categoryId)
        {
            var category = _context.Categories.Find(categoryId);
            return Ok(category);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("api/categories/createOrEditCategory")]
        public ActionResult CreateOrEdit([FromBody]Category categoryInput)
        {
            if (categoryInput == null)
                return BadRequest();

            if (categoryInput.Id > 0)
            {
                var category = _context.Categories.Find(categoryInput.Id);
                if (category == null)
                    return BadRequest();

                category.Name = categoryInput.Name;
                category.Metadata = categoryInput.Metadata;
                category.LastModificationTime = DateTime.Now;
                _context.Entry(category).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                categoryInput.CreationTime = DateTime.Now;
                _context.Categories.Add(categoryInput);
                _context.SaveChanges();
            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("api/categories/deleteCategories")]
        public ActionResult Delete(int[] input)
        {
            foreach (var id in input)
            {
                var category = _context.Categories.Find(id);
                if (category != null)
                {
                    category.IsDeleted = true;
                    category.DeletionTime = DateTime.Now;
                    _context.Entry(category).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.SaveChanges();
                }
            }
            return Ok();
        }
    }
}
