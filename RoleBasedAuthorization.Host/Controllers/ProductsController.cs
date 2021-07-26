using RoleBasedAuthorization.Core.Products;
using RoleBasedAuthorization.EFCore;
using RoleBasedAuthorization.Host.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Controllers
{
    public class ProductsController : Controller
    {
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("api/products/getAll")]
        public ActionResult<PagedResultDto<Product>> GetAll(ProductsGetAllInput input)
        {
            var products = _context.Products.Where(u=>u.IsDeleted != true);
            var filteredProducts = _context.Products.Include("Category")
                .AsEnumerable()
                .Where(product => 
                    string.IsNullOrEmpty(input.Filter) || 
                    product.Name.Contains(input.Filter, StringComparison.OrdinalIgnoreCase) || 
                    (!string.IsNullOrEmpty(product.Metadata) && product.Metadata.Split(',').Contains(input.Filter)))
                .Skip(input.Skip ?? 0)
                .Take(input.Take ?? int.MaxValue)
                .ToList();

            return Ok(new PagedResultDto<Product>() { Data = filteredProducts, Total = products.Count() });
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpGet("api/products/getProductForEdit")]
        public ActionResult<Product> GetProductForEdit(int productId)
        {
            var product = _context.Products.Find(productId);
            return Ok(product);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("api/products/createOrEditProduct")]
        public ActionResult CreateOrEdit([FromBody] Product productInput)
        {
            if (productInput == null)
                return BadRequest();

            if (productInput.Id > 0)
            {
                var product = _context.Products.Find(productInput.Id);
                if (product == null)
                    return BadRequest();

                product.Name = productInput.Name;
                product.Metadata = productInput.Metadata;
                product.CategoryId = productInput.CategoryId;
                product.LastModificationTime = DateTime.Now;
                _context.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                productInput.CreationTime = DateTime.Now;
                _context.Products.Add(productInput);
                _context.SaveChanges();
            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("api/products/deleteProducts")]
        public ActionResult Delete(int[] input)
        {
            foreach (var id in input)
            {
                var product = _context.Products.Find(id);
                if (product != null)
                {
                    product.IsDeleted = true;
                    product.DeletionTime = DateTime.Now;
                    _context.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.SaveChanges();
                }
            }
            return Ok();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("api/products/getCategoriesList")]
        public ActionResult<List<DropDownDto>> GetCategoriesList()
        {
            var categories = _context.Categories.Select(category => new DropDownDto() { Id = category.Id, Name = category.Name });
            return Ok(categories);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost("api/products/getCategoryMetadata")]
        public ActionResult<string[]> GetCategoryMetadata(int categoryId)
        {
            var metadata = new string[] { };
            var category = _context.Categories.Find(categoryId);
            if (category != null && !string.IsNullOrWhiteSpace(category.Metadata))
                metadata = category.Metadata.Split(',').ToArray();

            return Ok(metadata);
        }
    }
}
