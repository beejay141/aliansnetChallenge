using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces.Repositories
{
    public interface IRepository<TEntity, TKey>
    {
        Task<TEntity> InsertAsync(TEntity entity);
        TEntity Update(TEntity entity);
        Task<TEntity> FindAsync(TKey id);
        Task<TEntity> FirstOrDefaultAsync(Func<TEntity, bool> filter, params Expression<Func<TEntity, object>>[] includes);

        /// <summary>
        /// Find list of elements with filters and includes.
        /// </summary>
        /// <param name="filter"> Your lambda expression to filter the list</param>
        /// <param name="skip">Skips a certain number of elements</param>
        /// <param name="take"> Takes count to limit return elements</param>
        /// <param name="orderBy">Takes the element key which the list will be sorted by</param>
        /// <param name="descendingOrder">Default to true; the list is sorted in descending order by default if orderBy param is not null</param>
        /// <param name="includes">Takes includes params, use this to include elements navigational properties</param>
        /// <returns></returns>
        Task<List<TEntity>> FindAllAsync(Func<TEntity, bool> filter = null, int skip = 0, int? take = null, Func<TEntity, object> orderBy = null, bool descendingOrder = true, params Expression<Func<TEntity, object>>[] includes);
        Task CommitUnitOfWorkAsync();

    }
}
