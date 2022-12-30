import React from 'react';

import styles from './CompareSide.module.scss';
import classnames from 'classnames/bind';
import SvgSolutionsCompletedTick from '../../../../svgComponents/SolutionsCompletedTick';
import SvgSolutionsEmptyTick from '../../../../svgComponents/SolutionsEmptyTick';
import SvgSolutionsCross from '../../../../svgComponents/SolutionsCross';
import SvgSolutionsCompare1 from '../../../../svgComponents/SolutionsCompare1';
import SvgSolutionsCompare2 from '../../../../svgComponents/SolutionsCompare2';
import SvgSolutionsCompare3 from '../../../../svgComponents/SolutionsCompare3';
import SvgSolutionsCompare4 from '../../../../svgComponents/SolutionsCompare4';
import SvgSolutionsCompare5 from '../../../../svgComponents/SolutionsCompare5';
import SvgSolutionsCompare6 from '../../../../svgComponents/SolutionsCompare6';

const cn = classnames.bind(styles);

const CompareSide = ({ data }) => {
  return (
    <section className={cn('compare-side')}>
      <div className={cn('compare-side__wrapper')}>
        <div className={cn('compare-side__columns')}>
          {data?.companiesPlan.map((item, index) => {
            return index === 0 ? (
              <div className={cn('compare-side__column', 'compare-side__column-desktop')} key={`compare${index}`}>
                <div className={cn('compare-side__column-wrapper')}>
                  <h2 className={cn('compare-side__column-title')}>{data?.companiesPlan[0]?.planName}</h2>
                </div>
                {Object.keys(data?.companiesComparisonPoints).map((item, index) => {
                  return index === 0 ? null : (
                    <div className={cn('compare-side__block-info')} key={`compareSide${index}`}>
                      {index === 1 && <SvgSolutionsCompare2 />}
                      {index === 2 && <SvgSolutionsCompare3 />}
                      {index === 3 && <SvgSolutionsCompare4 />}
                      {index === 4 && <SvgSolutionsCompare5 />}
                      {index === 5 && <SvgSolutionsCompare1 />}
                      {index === 6 && <SvgSolutionsCompare6 />}

                      {index === 1 && (
                        <div className={cn('compare-side__column-info')}>
                          {data?.companiesComparisonPoints.wealthPlatformAccess}
                        </div>
                      )}
                      {index === 2 && (
                        <div className={cn('compare-side__column-info')}>
                          {data?.companiesComparisonPoints.advancedHealth}
                        </div>
                      )}
                      {index === 3 && (
                        <div className={cn('compare-side__column-info')}>
                          {data?.companiesComparisonPoints.durablePower}
                        </div>
                      )}
                      {index === 4 && (
                        <div className={cn('compare-side__column-info')}>
                          {data?.companiesComparisonPoints.guardianshipNomination}
                        </div>
                      )}
                      {index === 5 && (
                        <div className={cn('compare-side__column-info')}>
                          {data?.companiesComparisonPoints.lastWill}
                        </div>
                      )}
                      {index === 6 && (
                        <div className={cn('compare-side__column-info')}>
                          {data?.companiesComparisonPoints.revocableTrust}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={cn('compare-side__column')} key={`compareColumn${index}`}>
                <div className={cn('compare-side__column-wrapper')}>
                  <h2 className={cn('compare-side__column-title')}>{item.planName}</h2>
                </div>
                <div className={cn('compare-side__column-img')}>
                  {index === 1 && (
                    <div className={cn('compare-side__column-text')}>
                      {data?.companiesComparisonPoints.wealthPlatformAccess}
                    </div>
                  )}
                  {item.wealthPlatformAccess === 0 && <SvgSolutionsCompletedTick className={cn('green-icon')} />}
                  {item.wealthPlatformAccess === 1 && <SvgSolutionsEmptyTick />}
                  {item.wealthPlatformAccess === 2 && <SvgSolutionsCross />}
                </div>
                <div className={cn('compare-side__column-img')}>
                  {index === 1 && (
                    <div className={cn('compare-side__column-text')}>
                      {data?.companiesComparisonPoints.advancedHealth}
                    </div>
                  )}
                  {item.advancedHealth === 0 && <SvgSolutionsCompletedTick />}
                  {item.advancedHealth === 1 && <SvgSolutionsEmptyTick />}
                  {item.advancedHealth === 2 && <SvgSolutionsCross />}
                </div>
                <div className={cn('compare-side__column-img')}>
                  {index === 1 && (
                    <div className={cn('compare-side__column-text')}>
                      {data?.companiesComparisonPoints.durablePower}
                    </div>
                  )}
                  {item.durablePower === 0 && <SvgSolutionsCompletedTick />}
                  {item.durablePower === 1 && <SvgSolutionsEmptyTick />}
                  {item.durablePower === 2 && <SvgSolutionsCross />}
                </div>
                <div className={cn('compare-side__column-img')}>
                  {index === 1 && (
                    <div className={cn('compare-side__column-text')}>
                      {data?.companiesComparisonPoints.guardianshipNomination}
                    </div>
                  )}
                  {item.guardianshipNomination === 0 && <SvgSolutionsCompletedTick />}
                  {item.guardianshipNomination === 1 && <SvgSolutionsEmptyTick />}
                  {item.guardianshipNomination === 2 && <SvgSolutionsCross />}
                </div>
                <div className={cn('compare-side__column-img')}>
                  {index === 1 && (
                    <div className={cn('compare-side__column-text')}>{data?.companiesComparisonPoints.lastWill}</div>
                  )}
                  {item.lastWill === 0 && <SvgSolutionsCompletedTick />}
                  {item.lastWill === 1 && <SvgSolutionsEmptyTick />}
                  {item.lastWill === 2 && <SvgSolutionsCross />}
                </div>
                <div className={cn('compare-side__column-img')}>
                  {index === 1 && (
                    <div className={cn('compare-side__column-text')}>
                      {data?.companiesComparisonPoints.revocableTrust}
                    </div>
                  )}
                  {item.revocableTrust === 0 && <SvgSolutionsCompletedTick />}
                  {item.revocableTrust === 1 && <SvgSolutionsEmptyTick />}
                  {item.revocableTrust === 2 && <SvgSolutionsCross />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompareSide;
