import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { updateUnitSkill } from '../actions/units'
import SkillItem from './SkillItem';
import UpdateSkillItem from './UpdateSkillItem';
import UserContext from './UserContext';

const UnitDetails = ({ unitObj, setUnitObj, getUnitData} ) => {
    const { teacher_id, unit_id } = useParams();
    const {currentUser} = React.useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);
    const [editingSkills, setEditingSkills] = useState(false)
    const [unitSkills, setUnitSkills] = useState([])
    const [updatingSkillId, setUpdatingSkillId] = useState(null)
    const [updatingSkill, setUpdatingSkill] = useState([])

    useEffect(() => {
      async function fetchData() {
        if (currentUser) {
          setIsLoading(true);
          setErrorMessages([]);
  
          const data = await getUnitData(teacher_id, unit_id);
  
          if (data) {
            setUnitObj(data);
            setUnitSkills(data.skills)
          } else {
            setErrorMessages(['Failed to fetch unit data.']);
          }
          setIsLoading(false);
        }
      }
      fetchData();
    }, [currentUser, unit_id]);

    const handleUpdateSkillClick = (skillId) => {
      const skillToUpdate = unitSkills.find(skill => skill.id === skillId);
      setUpdatingSkillId(skillId);
      setUpdatingSkill(skillToUpdate);
      setEditingSkills(true);
    };
    

    const handleSkillChange = (field, value) => {
      setUpdatingSkill({ ...updatingSkill, [field]: value})
    };

    console.log(updatingSkill)
    
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
        if (data.error) {
          setErrorMessages(data.error);
        } else {
          setEditingSkills(false)
          handleEditSkill(updatingSkill)
        }
      })
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

    const skillList = unitSkills.map((unitSkill) => <SkillItem key={unitSkill.id} unitSkill={unitSkill} handleUpdateSkillClick={handleUpdateSkillClick} />)
  
    const updatingSkillList = unitSkills.map((unitSkill) => <UpdateSkillItem key={unitSkill.id} unitSkill={unitSkill} updatingSkill={updatingSkill} updatingSkillId={updatingSkillId} handleSkillChange={handleSkillChange} updateSkill={updateSkill} toggleEditSkills={toggleEditSkills} handleUpdateSkillClick={handleUpdateSkillClick} />)

    return (
      <div className="main" style={{ marginLeft: '50px' }}>
        <h1>Unit Details for: {unitObj.title}</h1>
        <h3>Description: {unitObj.description}</h3>
        <br />
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
          </tbody>
        </table>
        <br />
      </div>
    );
  };
  
  export default UnitDetails;