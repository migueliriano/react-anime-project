import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'underscore';

import AutoComplete from 'material-ui/AutoComplete';


class SearchInput extends React.PureComponent {
  static defaultProps = {
    searchDataSource: [],
  };

  static PropTypes = {
    searchDataSource: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    dataSource: [],
  };
  
  constructor(props) {
    super(props);
    this.handleUpdateInput = _.debounce(this.handleUpdateInput, 300);
  };

  componentWillReceiveProps = ({ dataSource }) => {
    if (dataSource !== this.state.dataSource) {
      const formatedData = this.getFormatedData(dataSource);
      this.setState({dataSource: formatedData});
    }
  };

  getFormatedData(dataSource) {
    return dataSource.map( source => ({
        text: source.attributes.canonicalTitle,
        value: source.id
      })
    );
  };

  handleUpdateInput = animeName => {
    const { dataSource, isFeching } = this.props;
    if (!isFeching && animeName.length > 3) {
      this.props.fetchSearchAnime(animeName);
    }else {
      this.setState({dataSource: []});
    }
  };

  handleSelectFilter = (chosenRequest, index) => {
    window.location.href = "/anime/" + chosenRequest.value;    
  }

  render = () => {
    console.log(this.state.dataSource);
    return (
      <AutoComplete
        floatingLabelText="Search Anime"
        openOnFocus={true}
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
        underlineFocusStyle={{ borderColor: 'red' }}
        filter={AutoComplete.noFilter}
        onNewRequest={this.handleSelectFilter}
      />
    )
  }
}

export default SearchInput;
