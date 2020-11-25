/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */

/* @flow */
import React from 'react';
import styled from '@ncigdc/theme/styled';
import {
  mergeQuery,
  makeFilter,
  inCurrentFilters,
} from '@ncigdc/utils/filters';
import PieChart from '@cqdg/components/charts/PieChart';
import { Row, Column } from '@ncigdc/uikit/Flex';
import { stringifyJSONParam } from '@ncigdc/utils/uri';
import removeEmptyKeys from '@ncigdc/utils/removeEmptyKeys';
import HorizontalBarChart from "./HorizontalBarChart";

const toPieData = (clickHandler, docTypeSingular) => bucket => ({
  id: bucket.key,
  doc_count: bucket.doc_count,
  clickHandler,
  tooltip: (
    <span>
      <b>{bucket.key}</b>
      <br />
      {bucket.doc_count.toLocaleString()} {docTypeSingular}
      {bucket.doc_count > 1 ? 's' : ''}
    </span>
  ),
});

export const ColumnCenter = styled(Column, {
  justifyContent: 'center',
  alignItems: 'center',
});

export const WrappedRow = styled(Row, {
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
});

export const RowCenter = styled(Row, {
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const ShowToggleBox = styled.div({
  border: ({ theme }) => `1px solid ${theme.greyScale4}`,
  padding: '0.5rem 1rem',
  backgroundColor: ({ theme }) => theme.white,
  cursor: 'pointer',
  color: ({ theme }) => theme.primary,
});

export const BottomBorderedBox = styled(Row, {
  borderBottom: ({ theme }) => `1px solid ${theme.greyScale4}`,
  paddingBottom: '1.5rem',
  justifyContent: 'center',
});

export const PieTitle = styled.div({
  color: ({ theme }) => theme.primary || 'inherit',
  paddingTop: '1rem',
});

function addFilter(query: Object, push: Function): Function {
  return (field, values) => {
    const newQuery = mergeQuery(
      {
        filters: makeFilter([
          { field, value: Array.isArray(values) ? values : [values] },
        ]),
      },
      query,
      'toggle',
    );

    push({
      query: removeEmptyKeys({
        ...newQuery,
        filters: newQuery.filters && stringifyJSONParam(newQuery.filters),
      }),
    });
  };
}

export const SelfFilteringPie = ({
  docTypeSingular,
  buckets,
  query,
  push,
  fieldName,
  currentFieldNames,
  currentFilters,
  ...props
}) => (
  <PieChart
    data={(buckets || [])
      .filter(bucket => bucket.key !== '__missing__')
      .filter(
        bucket =>
          currentFieldNames.includes(fieldName)
            ? inCurrentFilters({
                key: bucket.key,
                dotField: fieldName,
                currentFilters,
              })
            : true,
      )
      .map(
        toPieData(
          ({ data }) => addFilter(query, push)(fieldName, data.id),
          docTypeSingular,
        ),
      )}
    {...props}
  />
);

export const SelfFilteringBars = ({
                                   docTypeSingular,
                                   buckets,
                                   query,
                                   push,
                                   fieldName,
                                   currentFieldNames,
                                   currentFilters,
                                   ...props
                                 }) => (
  <HorizontalBarChart
    data={(buckets || [])
      .filter(bucket => bucket.key !== '__missing__')
      .filter(
        bucket =>
          currentFieldNames.includes(fieldName)
            ? inCurrentFilters({
              key: bucket.key,
              dotField: fieldName,
              currentFilters,
            })
            : true,
      )
      .slice(0, 10)
      .map(
        toPieData(
          (data) => addFilter(query, push)(fieldName, data.id),
          docTypeSingular,
        ),
      )}
    {...props}
  />
);