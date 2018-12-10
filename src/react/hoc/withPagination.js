import React, { PureComponent, Fragment } from 'react';

export default function withPagination(WrappedComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        quantityToShow: 15,
        allItems: [],
        itemsToShow: [],
        pagesCount: 0,
        baselinePage: 0,
        startShowItem: 0,
        finishShowItem: 0,
      };

      this.feedPagination = this.feedPagination.bind(this);
      this.changePage = this.changePage.bind(this);
      this.loadMore = this.loadMore.bind(this);
    }

    feedPagination(allItems, quantityToShow = this.state.quantityToShow) {
      const pagesCount = Math.ceil(allItems.length / quantityToShow);
      let initialItemsToShow = allItems.slice(0, quantityToShow);

      this.setState(() => ({
        itemsToShow: initialItemsToShow,
        allItems,
        baselinePage: 1,
        finishShowItem: quantityToShow,
        pagesCount,
      }));
    }

    changePage(page) {
      const { quantityToShow, allItems } = this.state;

      let startShowItem = (page - 1) * quantityToShow;
      let finishShowItem = page * quantityToShow;
      let itemsToShow = allItems.slice(startShowItem, finishShowItem);

      this.setState({
        startShowItem,
        finishShowItem,
        itemsToShow,
        baselinePage: page,
      });
    }

    loadMore() {
      const {
        startShowItem,
        finishShowItem: _finishShowItem,
        quantityToShow,
        allItems,
        baselinePage,
      } = this.state;

      let finishShowItem = _finishShowItem + quantityToShow;
      let itemsToShow = allItems.slice(startShowItem, finishShowItem);
      let newBaselinePage = (finishShowItem - baselinePage * quantityToShow) >= quantityToShow * 3
        ? baselinePage + 3
        : baselinePage;

      this.setState({
        finishShowItem,
        itemsToShow,
        baselinePage: newBaselinePage,
      });
    }

    // Following method may be replaced by factory when complexity increase

    renderPagination() {
      const { baselinePage, pagesCount, finishShowItem, quantityToShow } = this.state;

      return (
        <div className='pagination'>
          <div className='pagination__section pagination__load-more'>
            {pagesCount > 1
              ? <span
                onClick={this.loadMore}
                className='pagination__element'>
                <span className='material-icons icon'>loop</span></span>
              : null
            }
          </div>
          <div className='pagination__section pagination__pages'>
            {baselinePage !== 1
              ? <span
                onClick={this.changePage.bind(this, 1)}
                className='pagination__element material-icons icon'>
                undo</span>
              : null
            }
            {true
              ? <span
                onClick={this.changePage.bind(this, baselinePage)}
                className='pagination__element pagination__page--covered'>
                {baselinePage}
              </span>
              : null
            }
            {baselinePage + 1 < pagesCount
              ? <span
                onClick={this.changePage.bind(this, baselinePage + 1)}
                className={`pagination__element
                  ${(baselinePage + 1) * quantityToShow <= finishShowItem
                  ? 'pagination__page--covered'
                  : ''}`}>
                {baselinePage + 1}</span>
              : null
            }
            {baselinePage + 2 < pagesCount
              ? <span
                onClick={this.changePage.bind(this, baselinePage + 2)}
                className={`pagination__element
                  ${(baselinePage + 2) * quantityToShow <= finishShowItem
                  ? 'pagination__page--covered'
                  : ''}`}
                >{baselinePage + 2}</span>
              : null
            }
            {baselinePage + 3 < pagesCount
              ? <span
                onClick={this.changePage.bind(this, baselinePage + 3)}
                className={`pagination__element
                  ${(baselinePage + 3) * quantityToShow <= finishShowItem
                  ? 'pagination__page--covered'
                  : ''}`}
                >...</span>
              : null
            }
            {baselinePage !== pagesCount
              ? <span
                onClick={this.changePage.bind(this, pagesCount)}
                className={`pagination__element
                  ${pagesCount * quantityToShow <= finishShowItem
                  ? 'pagination__page--covered'
                  : ''}`}
                >{pagesCount}</span>
              : null
            }
          </div>
        </div>
      );
    }

    render() {
      const { itemsToShow } = this.state;

      return (
        <Fragment>
          <WrappedComponent
            feedPagination={this.feedPagination}
            itemsToShow={this.state.itemsToShow}
          />
          {itemsToShow.length !== 0
            ? this.renderPagination()
            : null}
        </Fragment>
      );
    }
  };
}
