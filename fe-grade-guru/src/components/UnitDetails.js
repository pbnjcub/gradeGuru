import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { deleteUnitSkill, updateUnitSkill } from '../actions/units';
import { createUnitSkill } from '../actions/units';
import UpdateUnitForm from './UpdateUnitForm'
import SkillItem from './SkillItem';
import CreateSkillForm from './CreateSkillForm';
import UpdateSkillItem from './UpdateSkillItem';
import UserContext from './UserContext';

const UnitDetails = ({ unitObj, setUnitObj, getUnitData} ) => {
    const { teacher_id, unit_id } = useParams();
    const {currentUser} = React.useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);
    const [editingSkills, setEditingSkills] = useState(false)
    const [editingUnit, setEditingUnit] = useState(false)
    const [unitSkills, setUnitSkills] = useState([])
    const [updatingSkillId, setUpdatingSkillId] = useState(null)
    const [updatingSkill, setUpdatingSkill] = useState([])
    const [newUnitSkill, setNewUnitSkill] = useState({
      title: "",
      description: "",
      unit_id: "",
    });
    const [creatingNewSkill, setCreatingNewSkill] = useState(false)

    useEffect(() => {
      async function fetchData() {
        if (currentUser) {
          setIsLoading(true);
          setErrorMessages([]);
  
          const data = await getUnitData(teacher_id, unit_id);
  
          if (data) {
            setUnitObj(data);
            setUnitSkills(data.skills)
            setNewUnitSkill({
              title: "",
              description: "",
              unit_id: data.id,
            })
          } else {
            setErrorMessages(['Failed to fetch unit data.']);
          }
          setIsLoading(false);
        }
      }
      fetchData();
    }, [currentUser, unit_id, teacher_id]);

    const handleUpdatedUnit = (updatedUnit) => {
      setUnitObj(updatedUnit)
    };

    const handleUpdateSkillClick = (skillId) => {
      const skillToUpdate = unitSkills.find(skill => skill.id === skillId);
      setUpdatingSkillId(skillId);
      setUpdatingSkill(skillToUpdate);
      setEditingSkills(true);
    };
    
    const handleSkillChange = (field, value) => {
      setUpdatingSkill({ ...updatingSkill, [field]: value})
    };

    const addUnitSkill = (newUnitSkill) => {
      const updatedUnitSkills = [...unitSkills, newUnitSkill];
      setUnitSkills(updatedUnitSkills);
    };

    const handleNewUnitSkill = async (newUnitSkill) => {
      createUnitSkill(teacher_id, unit_id, newUnitSkill)
        .then((data) => {
          console.log(data)
          if (data.errors) {
            setErrorMessages(data.errors);
          } else {
            addUnitSkill(data)
          }
        })
    }

    const handleDeleteUnitSkill = async (deletedSkillId) => {
      deleteUnitSkill(teacher_id, unit_id, deletedSkillId)
      const updatedUnitSkills = unitSkills.filter((skill) => skill.id !== deletedSkillId);
      setUnitSkills(updatedUnitSkills);
    };

    const handleEditSkill = (updatedSkill) => {
      const updatedUnitSkills = unitSkills.map(skill => {
        if (skill.id === updatedSkill.id) {
          return updatedSkill;
        } else {
          return skill
        }
      })
      setUnitSkills(updatedUnitSkills)
    };
    
    const updateSkill = async () => {
      updateUnitSkill(teacher_id, unit_id, updatingSkill.id, updatingSkill)
      .then((data) => {
        if (data.errors) {
          setErrorMessages(data.errors);
        } else {
          setEditingSkills(false)
          handleEditSkill(updatingSkill)
        }
      })
    };

    const toggleEditingUnit = () => {
      setEditingUnit(!editingUnit)
    }

    const toggleNewSkill = () => {
      setCreatingNewSkill(!creatingNewSkill)
    };

    const toggleEditSkills = () => {
      setEditingSkills(!editingSkills);
    };
    
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (errorMessages.length > 0) {
      return <p>Error: {errorMessages.join(', ')}</p>;
    }

    const skillList = unitSkills.map((unitSkill) => <SkillItem key={unitSkill.id} unitSkill={unitSkill} handleUpdateSkillClick={handleUpdateSkillClick} handleDeleteUnitSkill={handleDeleteUnitSkill} />)
  
    const updatingSkillList = unitSkills.map((unitSkill) => <UpdateSkillItem key={unitSkill.id} unitSkill={unitSkill} updatingSkill={updatingSkill} updatingSkillId={updatingSkillId} handleSkillChange={handleSkillChange} updateSkill={updateSkill} toggleEditSkills={toggleEditSkills} handleUpdateSkillClick={handleUpdateSkillClick} />)

    return (
      <div className="main" style={{ marginLeft: '50px' }}>
        <h1>Unit Details for: {unitObj.title}</h1>
        <h3>Description: {unitObj.description}</h3>
        <br />
          {!editingUnit && (
            <button className="pure-button pure-button-primary" onClick={toggleEditingUnit}>
              Update Unit
            </button>
          )}
          {editingUnit && (
            <UpdateUnitForm unitObj={unitObj} handleUpdatedUnit={handleUpdatedUnit} toggleEditingUnit={toggleEditingUnit}/>
          )}
          <h3>Unit Skills</h3>
          <table className="pure-table pure-table-horizontal">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th rowSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {editingSkills ? (
                updatingSkillList
              ) : (
                skillList
              )}
              {creatingNewSkill ? (
                <tr>
                  <td colSpan="3">
                    <CreateSkillForm teacher_id={teacher_id} unitObj={unitObj} newUnitSkill={newUnitSkill} setNewUnitSkill={setNewUnitSkill} handleNewUnitSkill={handleNewUnitSkill} toggleNewSkill={toggleNewSkill}/>
                  </td>
                </tr>
              ) : null}
              {!creatingNewSkill ? (
                <tr>
                  <td>
                    <button className="pure-button pure-button-primary" onClick={toggleNewSkill}>
                      Add Skill
                    </button>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <br />
        </div>
    );
};
  
  export default UnitDetails;