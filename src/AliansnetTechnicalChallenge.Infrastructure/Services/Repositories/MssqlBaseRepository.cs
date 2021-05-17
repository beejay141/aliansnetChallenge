using AliansnetTechnicalChallenge.Core.Interfaces.Repositories;
using AliansnetTechnicalChallenge.Infrastructure.Data.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services.Repositories
{
    public class MssqlBaseRepository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity : class
    {
        private readonly MssqlDbContext dbContext;

        public MssqlBaseRepository(MssqlDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<TEntity> FindAsync(TKey id)
        {
            return await dbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<List<TEntity>> FindAllAsync(Func<TEntity, bool> filter = null, int skip = 0, int? take = null, Func<TEntity,object> orderBy = null, bool descendingOrder = true, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = null;

            if (includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    if (query == null)
                    {
                        query = dbContext.Set<TEntity>().Include(include);
                    }
                    else
                    {
                        query.Include(include);
                    }
                }
            }
            else
            {
                query = dbContext.Set<TEntity>();
            }

            if (filter == null)
            {
                if (take != null)
                {
                    return orderBy == null ? await Task.FromResult(query.Skip(skip).Take((int)take).ToList()) : 
                        descendingOrder ? await Task.FromResult(query.OrderByDescending(orderBy).Skip(skip).Take((int)take).ToList()) :
                        await Task.FromResult(query.OrderBy(orderBy).Skip(skip).Take((int)take).ToList());
                }

                return orderBy == null ? await Task.FromResult(query.ToList()) :
                     descendingOrder ? await Task.FromResult(query.OrderByDescending(orderBy).ToList()) : await Task.FromResult(query.OrderBy(orderBy).ToList());
            }

            if (take != null)
            {
                return orderBy == null ? await Task.FromResult(query.Where(filter).Skip(skip).Take((int)take).ToList()) :
                    descendingOrder ? await Task.FromResult(query.Where(filter).OrderByDescending(orderBy).Skip(skip).Take((int)take).ToList()) :
                    await Task.FromResult(query.Where(filter).OrderBy(orderBy).Skip(skip).Take((int)take).ToList());
            }

            return orderBy == null ? await Task.FromResult(query.Where(filter).ToList()) :
                descendingOrder ? await Task.FromResult(query.Where(filter).OrderByDescending(orderBy).ToList()) :
                await Task.FromResult(query.Where(filter).OrderBy(orderBy).ToList());
        }

        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            await dbContext.Set<TEntity>().AddAsync(entity);
            return entity;
        }

        public async Task<TEntity> FirstOrDefaultAsync(Func<TEntity, bool> filter, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = dbContext.Set<TEntity>().Where(filter).AsQueryable();

            if (includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    query.Include(include);
                }
            }

            return await query.FirstOrDefaultAsync();
        }

        public TEntity Update(TEntity entity)
        {
            dbContext.Set<TEntity>().Update(entity);
            return entity;
        }

        public async Task CommitUnitOfWorkAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
