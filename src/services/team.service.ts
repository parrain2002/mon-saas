// services/team.service.ts

import api from "./api";

export const TeamService = {
  getMembers: async () => {
    const res = await api.get("/team/members");
    return res.data;
  },

  addMember: async (memberId: number) => {
    const res = await api.post("/team/add-member", { memberId });
    return res.data;
  },

  removeMember: async (memberId: number) => {
    const res = await api.delete(`/team/remove-member/${memberId}`);
    return res.data;
  }
};
