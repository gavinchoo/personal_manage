import React from 'react'

import {addPersonal} from '../../actions/personal'
import {DatePicker, Input, Radio, Button, message, Row, Col, Select} from 'antd'
import '../stylesheets/addperson.less'

const RadioGroup = Radio.Group
const Option = Select.Option

class PersonBaseInfo extends React.Component {

    constructor(props) {
        super(props)
    }

    handleEducationChange = (value) => {
        this.props.handleSelectChange('education', value.label)
    }

    render() {
        return (
          <div className="base-info">
              <div className="row-container">
                  <Row gutter={16} type="flex">
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '23px'}}>姓名：</label>
                          <Input type="text" onChange={this.props.handleChange} name="name"/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>性别：</label>
                          <RadioGroup onChange={this.props.handleChange} name="sex" defaultValue={1}>
                              <Radio value={1}>男</Radio>
                              <Radio value={0}>女</Radio>
                          </RadioGroup>
                      </Col>
                      <Col xs={24} lg={8}>
                          <label>出生年月：</label>
                          <DatePicker size="large" placeholder="请选择出生年月"
                                      onChange={(date, dateString) => this.props.handleBirDateChange(date, dateString)}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>联系电话：</label>
                          <Input type="text" onChange={this.props.handleChange} name="mobile"/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>身份证号：</label>
                          <Input type="text" onChange={this.props.handleChange} name="idCard"/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '23px'}}>学历：</label>
                          <Select labelInValue type="text" className='select_width'
                                  onChange={this.handleEducationChange}
                                  name="education">
                              <Option value="1">研究生</Option>
                              <Option value="2">本科</Option>
                              <Option value="3">专科</Option>
                          </Select>
                      </Col>
                  </Row>
              </div>
          </div>
        )
    }
}

class PoliticalInfo extends React.Component {

    constructor(props) {
        super(props)
    }

    handlePoliticalTypeChange = (value) => {
        this.props.handleSelectChange('politicalStatus', value.label)
    }

    handleWorkDateChange(value) {
        this.props.handleDateChange("joinPartDate", value)
    }

    render() {
        return (
          <div className="form-inline base-info">
              <div className="row-container">
                  <Row gutter={16} type="flex">
                      <Col xs={24} lg={8}>
                          <label>入党时间：</label>
                          <DatePicker size="large" placeholder="请选择任职日期" onChange={value => {
                              this.handleWorkDateChange(value)
                          }}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '11px'}}>政治面貌：</label>
                          <Select labelInValue className='select_width' onChange={this.handlePoliticalTypeChange}>
                              <Option value="1">党员</Option>
                              <Option value="2">农民</Option>
                          </Select>
                      </Col>
                  </Row>
              </div>
          </div>
        )
    }
}

class PersonWorkInfo extends React.Component {

    constructor(props) {
        super(props)
    }

    handleTypeChange = (value) => {
        this.props.handleSelectChange('type', value.label)
    }

    handleTownTypeChange = (value) => {
        this.props.handleSelectChange('townType', value.label)
    }

    handleWorkDateChange(value) {
        this.props.handleDateChange("officeDate", value)
    }

    render() {
        return (
          <div className="form-inline base-info">
              <div className="row-container">
                  <Row gutter={16} type="flex">
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '23px'}}>乡镇：</label>
                          <Input type="text" onChange={this.props.handleChange}
                                 name="village"/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '13px'}}>所在村：</label>
                          <Input type="text" onChange={this.props.handleChange} name="town"/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '11px'}}>村性质：</label>
                          <Select labelInValue className='select_width' onChange={this.handleTownTypeChange}>
                              <Option value="1">重点贫困村</Option>
                              <Option value="2">软弱涣散村</Option>
                          </Select>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '25px'}}>职务：</label>
                          <Input type="text" onChange={this.props.handleChange}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label style={{'margin-left': '23px'}}>类型：</label>
                          <Select labelInValue className='select_width' onChange={this.handleTypeChange}>
                              <Option value="1">大学生村官</Option>
                              <Option value="2">村医</Option>
                              <Option value="3">村教</Option>
                              <Option value="4">致富能手</Option>
                              <Option value="5">机关下派经选举担任</Option>
                          </Select>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>评优情况：</label>
                          <Input type="text" onChange={this.props.handleChange}/>
                      </Col>
                      <Col xs={24} lg={8}>
                          <label>任职时间：</label>
                          <DatePicker size="large" placeholder="请选择任职时间" onChange={value => {
                              this.handleWorkDateChange(value)
                          }}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>任职年限：</label>
                          <Input type="text" onChange={this.props.handleChange}
                                 name="officeYear"/>
                      </Col>
                      <Col xs={24} lg={12} className="gutter-box">
                          <label>在村任职前职业：</label>
                          <Input type="text" onChange={this.props.handleChange}
                                 name="beforeWork"/>
                      </Col>
                      <Col xs={24} lg={12} className="gutter-box">
                          <label>是否之前担任其他职务：</label>
                          <Input type="text" onChange={this.props.handleChange}
                                 name="beforeDuties"/>
                      </Col>
                  </Row>
              </div>
          </div>
        )
    }
}

export default class AddPerson extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sex: '1',
            birthday: '',
        }
    }

    addPerson() {
        if (this.state.name == undefined || this.state.name.length == 0) {
            message.error('姓名不能为空')
            return
        }

        if (this.state.village == undefined || this.state.village.length == 0) {
            message.error('乡镇不能为空')
            return
        }

        if (this.state.town == undefined || this.state.town.length == 0) {
            message.error('所在村不能为空')
            return
        }

        if (this.state.birthday == undefined || this.state.birthday.length == 0) {
            message.error('出生年月不能为空')
            return
        }

        addPersonal({
            props: this.props,
            body: this.state,
            success: (result) => {
                message.success('数据提交成功！')
            },
            error: (error) => {
                if (error.code !== 401) {
                    message.error('数据提交失败！')
                }
            }
        })
    }

    reset() {
        this.props.history.push('/home/person/addperson')
    }

    handleDateChange = (key, dateString) => {
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }

    handleSelectChange = (key, value) => {
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }

    handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
    }

    render() {
        return (
          <div className="container">
              <label className="text_lable">基本信息</label>
              <PersonBaseInfo handleChange={this.handleChange} handleSelectChange={this.handleSelectChange}
                              handleDateChange={this.handleDateChange}/>
              <label className="text_lable">政治信息</label>
              <PoliticalInfo handleChange={this.handleChange} handleSelectChange={this.handleSelectChange}
                             handleDateChange={this.handleDateChange}/>
              <label className="text_lable">任职信息</label>
              <PersonWorkInfo handleChange={this.handleChange} handleSelectChange={this.handleSelectChange}
                              handleDateChange={this.handleDateChange}/>

              <div className="form-inline action_btn_parent">
                  <Button type="primary" onClick={() => this.addPerson()} className="submitbtn">提交</Button>
                  <Button type="primary" style={{marginLeft: 50}} onClick={() => this.reset()}
                          className="submitbtn">重置</Button>
              </div>
          </div>
        )
    }
}